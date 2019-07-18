const simplifyjs = require('simplify-js')

const bezierSmooth = require('./bezier-smooth')

function optimizeLineCmd(lineCmd, {tolerance, smooth}) {
  // Note: lineCmd does not being with 'l'
  const numbers = lineCmd.match(/-?\d+ */g)
  const numbersGrouped = numbers.reduce((g, n, i) => {
    if (i % 2 === 1) {
      g.push([Number(numbers[i - 1]), Number(numbers[i])])
    }

    return g
  }, [])

  const points = numbersGrouped.map(([x, y]) => ({x, y}))
  const points2 = simplifyjs(points, Math.min(tolerance, 3), true)

  if (smooth) {
    const points2XY = points2.map(({x, y}) => [x, y])
    return bezierSmooth(points2XY, {smooth})
  }

  return points2.reduce((str, {x, y}) => str + ' ' + x + ' ' + y, 'l')
}

module.exports = function ({data}, {
  tolerance = 0,
  decimalPlaces = true,
  smooth = 0
}) {
  const paths = data.match(/d="([^"]+)"/g)
  const pathsCleaned = paths.map(m => m.substring(3, m.length - 1))
  const pathsCommands = pathsCleaned
    // Note: separate commands per path: [paths][commands]
    .map(d => d.match(/[a-z][^a-z]*/ig))

  let lineCmd = ''
  let paths2 = pathsCommands.map(cmds => cmds.reduce(
    (pathCmd, c) => {
      const cmd = c[0]

      if (cmd !== 'l' && lineCmd.length > 0) {
        const optimalLineCmd = tolerance || smooth ?
          optimizeLineCmd(lineCmd, {tolerance, smooth}) : // <-- OPTIMIZATIONS HERE ******************
          'l' + lineCmd
        pathCmd += optimalLineCmd
        lineCmd = ''
      }

      if (cmd === 'l') {
        lineCmd += ' ' + c.substr(1)
      } else {
        pathCmd += c
      }

      return pathCmd
    },
    '')
  )

  if (!decimalPlaces) {
    paths2 = paths2.map(p => {
      const numbers = p.match(/-?\d*\.\d/g) || []
      const numbersRounded = numbers.map(n => {
        const d = Math.abs(n % 1)
        if (d !== 0.5) {
          return Math.round(n)
        }

        return n
      })
      let idx = 0
      numbers.forEach((n, i) => {
        const pRemainder = p.slice(idx)
        p = p.slice(0, idx) + pRemainder.replace(String(n), numbersRounded[i])
        idx = pRemainder.indexOf(n) + String(numbersRounded[i]).length
      })
      return p
    })
  }

  const data2 = paths2.reduce(
    (str, p, i) => str.replace(paths[i], `d="${p}"`)
    , data
  )

  return data2
}
