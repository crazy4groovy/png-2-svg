const paper = require('paper-jsdom')

const {CompoundPath, Point, Size} = paper
paper.setup(new Size(999, 999))

const groupByTwo = (g, n, i, numbers) => {
  if (i % 2 === 1) {
    g.push([Number(numbers[i - 1]), Number(numbers[i])])
  }

  return g
}

function handleLineBy(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  if (path.closed) {
    const [x, y] = numbersGrouped.shift()
    path.moveTo(new Point(x, y))
  }

  numbersGrouped.forEach(([x, y]) => path.lineBy(new Point(x, y)))
}

function handleLineTo(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  if (path.closed) {
    const [x, y] = numbersGrouped.shift()
    path.moveTo(new Point(x, y))
  }

  numbersGrouped.forEach(([x, y]) => path.lineTo(new Point(x, y)))
}

function handleCubicBy(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  const lastGroup = numbersGrouped.pop()
  const [x, y] = lastGroup
  path.cubicCurveBy(new Point(x, y))
}

function handleQuadraticTo(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  const lastGroup = numbersGrouped.pop()
  const [x, y] = lastGroup
  path.quadraticCurveTo(new Point(x, y))
}

function handleQuadraticBy(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  const lastGroup = numbersGrouped.pop()
  const [x, y] = lastGroup
  path.quadraticCurveBy(new Point(x, y))
}

function handleArcBy(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  const lastGroup = numbersGrouped.pop()
  const [x, y] = lastGroup
  path.arcBy(new Point(x, y))
}

function handleArcTo(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  const lastGroup = numbersGrouped.pop()
  const [x, y] = lastGroup
  path.arcTo(new Point(x, y))
}

function handleMoveBy(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  const lastGroup = numbersGrouped.pop()
  const [x, y] = lastGroup
  path.moveBy(new Point(x, y))
}

function handleMoveTo(path, numbers) {
  const numbersGrouped = numbers.reduce(groupByTwo, [])
  const lastGroup = numbersGrouped.pop()
  const [x, y] = lastGroup
  path.moveTo(new Point(x, y))
}

const handleCommand = path => c => {
  const cmd = c[0]
  let numbers = c.substr(1).match(/-?\d+ */g)
  if (numbers) {
    numbers = numbers.map(n => n.trim())
  }

  switch (cmd) {
    case 'L': {
      return handleLineTo(path, numbers)
    }

    case 'l': {
      return handleLineBy(path, numbers)
    }

    case 'H': {
      return handleLineTo(path, [numbers[0], 0])
    }

    case 'h': {
      return handleLineBy(path, [numbers[0], 0])
    }

    case 'V': {
      return handleLineTo(path, [0, numbers[0]])
    }

    case 'v': {
      return handleLineBy(path, [0, numbers[0]])
    }

    case 'c': {
      return handleCubicBy(path, numbers)
    }

    case 'Q': {
      return handleQuadraticTo(path, numbers)
    }

    case 'q': {
      return handleQuadraticBy(path, numbers)
    }

    case 't': {
      return handleArcBy(path, numbers)
    }

    case 'T': {
      return handleArcTo(path, numbers)
    }

    case 'm': {
      return handleMoveBy(path, numbers)
    }

    case 'M': {
      return handleMoveTo(path, numbers)
    }

    case 'z': {
      return path.closePath()
    }

    default: {
      throw new Error(cmd + ' is UNKNOWN COMMAND')
    }
  }
}

const lineReducer = lineCmd => cs => cs.reduce(
  (pathCmds, c) => {
    const cmd = c[0]

    if (cmd !== 'l' && lineCmd.length > 1) {
      pathCmds.push(lineCmd)
      lineCmd = 'l'
    }

    if (cmd === 'l') {
      lineCmd += ' ' + c.substr(1)
    } else {
      pathCmds.push(c)
    }

    return pathCmds
  },
  [])

function optimizePath(d, {
  tolerance = 10,
  type = 'continuous',
  factor = 0.2,
  precision = 0
} = {}) {
  let commands = d.slice(3, -1).match(/[a-z][^a-z]*/ig)

  commands = lineReducer('l')(commands)

  const path = new CompoundPath()

  commands.forEach(handleCommand(path))

  path.children.forEach(p => p.reduce())

  if (tolerance) {
    path.children.forEach(p => p.simplify(tolerance))
  }

  if (type && factor) {
    try {
      path.children.forEach(p => p.smooth({type, factor}))
    } catch (error) {
      if (error.message !== 'Cannot read property \'_x\' of undefined') {
        throw error
      }
    }
  }

  const path2 = path.exportSVG({asString: true, precision})
  const d2 = (path2.match(/d="[^"]*"/g) || ['d=""'])[0]
  return d2
}

module.exports = optimizePath
