import svgo from './svgo'

const fs = require('fs')
const PNGReader = require('png.js')
const JPEGReader = require('jpeg-js')
const ImageTracer = require('imagetracerjs')

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

async function svgThumbnailer(imgFilename, {colors = 4} = {}) {
  const imgData = await getImgData(imgFilename)

  // https://github.com/jankovicsandras/imagetracerjs/blob/master/options.md
  // Note: more colors ==> less "tres" ==> more line precision
  const tres = Math.ceil(128 / (colors ** 2)) + 1
  const opts = {
    scale: 5,
    ltres: tres,
    qtres: tres,
    colorquantcycles: colors,
    numberofcolors: colors
  }
  return svgo.optimize(toSvg(imgData, opts))
}

export default svgThumbnailer
