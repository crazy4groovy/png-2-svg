const simplifyjs = require('simplify-js')

const bezierSmooth = require('./bezier-smooth')

function optimizeLineCmd(lineCmd, {tolerance, smooth, smoothDecimalPlaces}) {
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
    return bezierSmooth(points2XY, {smooth, smoothDecimalPlaces})
  }

  return points2.reduce((str, {x, y}) => {
    const spcX = (str.length === 1 || x < 0) ? '' : ' '
    const spcY = y < 0 ? '' : ' '
    return str + spcX + x + spcY + y
  }, 'l')
}

module.exports = function (data, {tolerance = 0.2, combineLines = false, smooth, smoothDecimalPlaces}) {
  console.log({tolerance, combineLines})
  const paths = data.match(/d="([^"]+)"/g)
  const pathsCleaned = paths.map(m => m.substring(3, m.length - 1))
  const pathsCommands = pathsCleaned
    // Note: separate commands per path: [paths][commands]
    .map(d => d.match(/[a-z][^a-z]*/ig))
    // Note: combine line command segments together
    .map(cs => cs.map(c => {
      if (!combineLines) {
        return c
      }

      const cmd = c[0]

      if (cmd === 'h') {
        return `l${c.substr(1)} 0`
      }

      if (cmd === 'v') {
        return `l0 ${c.substr(1)}`
      }

      if (cmd === 'q') {
        const [x, y] = c.substr(1).replace(/-/g, ' -').trim().split(' ').slice(2)
        return `l${x} ${y}`
      }

      return c
    }))

  let lineCmd = ''
  const paths2 = pathsCommands.map(cmds => cmds.reduce(
    (pathCmd, c) => {
      const cmd = c[0]

      if (cmd !== 'l' && lineCmd.length > 0) {
        const optimalLineCmd = optimizeLineCmd(lineCmd, {tolerance, smooth, smoothDecimalPlaces}) // <-- OPTIMIZATIONS HERE ******************
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
    .replace(/ (\D)/g, '$1')
    .replace(/ +-/g, '-')
  )

  const data2 = paths2.reduce(
    (str, p, i) => str.replace(new RegExp(paths[i]), `d="${p}"`)
    , data
  )

  return data2
}
