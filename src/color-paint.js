const {getPalette} = require('./color-thief')

module.exports = function (pixelData, colors) {
  const {palette} = getPalette(pixelData, colors)
  return palette.map(([r, g, b]) => ({r, g, b, a: 255}))
}
