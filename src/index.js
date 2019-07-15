
const fs = require('fs')
const PNGReader = require('png.js')
const JPEGReader = require('jpeg-js')
const ImageTracer = require('imagetracerjs')
const SVGO = require('svgo')

const {getPalette} = require('./color-thief')
const dataOptimize = require('./data-optimize')

const svgo = new SVGO({
  plugins: require('./svgo-plugins')
})

const toSvg = ImageTracer.imagedataToSVG

async function getImgData(imgFilename) {
  const bytes = fs.readFileSync(imgFilename)

  if (imgFilename.endsWith('png')) {
    const pngReader = new PNGReader(bytes)
    const result = await new Promise((resolve, reject) => {
      pngReader.parse((err, png) => {
        if (err) {
          reject(err)
        } else {
          resolve(png)
        }
      })
    })

    return {
      height: result.height,
      width: result.width,
      data: result.pixels
    }
  }

  return JPEGReader.decode(bytes)
}

async function svgThumbnailer(imgFilename, {colors = 4, scale = 1, vibrant = true, tolerance = 0, combineLines = false, smooth = 0, smoothDecimalPlaces} = {}) {
  const imgData = await getImgData(imgFilename)

  // https://github.com/jankovicsandras/imagetracerjs/blob/master/options.md
  // Note: more colors ==> less "tres" ==> more line precision
  const tres = Math.ceil(128 / (colors ** 2)) + 1
  const svgOpts = {
    scale,
    ltres: tres, // 1
    qtres: tres, // 1
    pathomit: Math.min(32, 4 + (colors * 3)), // 8
    colorquantcycles: Math.min(6, colors), // 3
    numberofcolors: colors, // 16
    mincolorratio: vibrant ? 0.00001 : 0.03 // 0.02
  }

  if (vibrant) {
    const {palette} = getPalette(imgData, colors)
    svgOpts.pal = palette.map(([r, g, b]) => ({r, g, b, a: 255}))
  }

  const svg = await svgo.optimize(toSvg(imgData, svgOpts))

  if (!(tolerance || combineLines || smooth)) {
    return svg
  }

  const optimizeOpts = {
    combineLines,
    smooth,
    smoothDecimalPlaces,
    tolerance
  }
  return svgo.optimize(dataOptimize(svg, optimizeOpts))
}

module.exports = svgThumbnailer
