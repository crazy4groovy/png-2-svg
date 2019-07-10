
const fs = require('fs')
const PNGReader = require('png.js')
const JPEGReader = require('jpeg-js')
const ImageTracer = require('imagetracerjs')
const SVGO = require('svgo')

const optimizePath = require('./paper-path')

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

async function svgThumbnailer(imgFilename, {
  colors = 6,
  scale = 2,
  tolerance = 10,
  type = 'continuous',
  factor = 0.2,
  precision = 0
} = {}) {
  const imgData = await getImgData(imgFilename)

  // https://github.com/jankovicsandras/imagetracerjs/blob/master/options.md
  // Note: more colors ==> less "tres" ==> more line precision
  const tres = Math.ceil(128 / (colors ** 2)) + 1
  const svgOpts = {
    scale,
    ltres: tres, // 1
    qtres: tres, // 1
    pathomit: 4 + (colors * 3), // 8
    colorquantcycles: Math.max(10, 2 + colors), // 3
    numberofcolors: colors, // 16
    mincolorratio: 0.03 // 0.02
  }
  const svg = await svgo.optimize(toSvg(imgData, svgOpts)) // SVGO #1
  const ds = svg.data.match(/d="[^"]+"/g)

  if (!(tolerance || factor || precision || ds)) {
    return svg
  }

  const optimizeOpts = {
    tolerance,
    type,
    factor,
    precision
  }
  const dsOptimized = ds.map(d => optimizePath(d, optimizeOpts))

  try {
    ds.forEach((d, i) => {
      svg.data = svg.data.replace(d, dsOptimized[i])
    })
  } catch (error) {
    console.error('D FOR EACH ERROR:', error.message)
  }

  return svgo.optimize(svg.data) // SVGO #2
}

module.exports = svgThumbnailer
