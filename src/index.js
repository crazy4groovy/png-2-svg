
const fs = require('fs')
const PNGReader = require('png.js')
const JPEGReader = require('jpeg-js')
const ImageTracer = require('imagetracerjs')
const SVGO = require('svgo')

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

async function svgThumbnailer(imgFilename, {colors = 4, scale = 2, tolerance = 0.2, smooth = 0} = {}) {
  const imgData = await getImgData(imgFilename)

  // https://github.com/jankovicsandras/imagetracerjs/blob/master/options.md
  // Note: more colors ==> less "tres" ==> more line precision
  const tres = Math.ceil(128 / (colors ** 2)) + 1
  const svgOpts = {
    scale,
    ltres: tres,
    qtres: tres,
    colorquantcycles: colors,
    numberofcolors: colors
  }
  const svg = await svgo.optimize(toSvg(imgData, svgOpts))
  /// console.log({svg})

  if (!(tolerance || smooth)) {
    return svg
  }

  const optimizeOpts = {
    smooth,
    tolerance
  }
  const data = dataOptimize(svg.data, optimizeOpts)
  /// console.log({d1: svg.data.length, d2: data.length})
  return {
    ...svg,
    data
  }
}

module.exports = svgThumbnailer
