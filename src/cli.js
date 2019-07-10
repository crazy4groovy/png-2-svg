import validateArgs from './validate-args'
import dir from './dir'

const fs = require('fs')
const toSvg = require('.')

function formatOutput(svg, filename) {
  let output = []
  if (filename) {
    output.push('FILENAME=' + filename + ':')
  }

  output.push(svg)

  if (filename) {
    output.push('[EOF]')
  }

  output = output.join('\n')
  return output
}

async function main() {
  const args = process.argv.slice(2)
  const [
    url,
    ...opts
  ] = args

  if (!url) {
    console.log('run: svg-thumbnailer {image-path} {options?}')
  }

  const options = opts.reduce((map, arg) => {
    const [k, v] = arg.replace(/^--?/, '').split('=')
    if (validateArgs[k]) {
      map[k] = validateArgs[k](v)
    }

    return map
  }, {})

  const {writeFileWithTag} = options

  const handleSrc = async (imgFilename, noCheckFileTag) => {
    if (!noCheckFileTag && !imgFilename.match(/\.(jpe?g|png)$/i)) {
      return
    }

    console.log(imgFilename)

    const {data} = await toSvg(imgFilename, options)
      .catch(error => {
        console.log(imgFilename, error)
        throw error
      })

    const formatFilename = writeFileWithTag ? undefined : imgFilename
    const output = formatOutput(data, formatFilename)

    if (!writeFileWithTag) {
      console.log(output)
      return
    }

    fs.writeFileSync(`${imgFilename}.${writeFileWithTag}`, output, 'utf-8')
  }

  if (dir.dirExists(url)) {
    await dir.scan(url, handleSrc)
  } else {
    handleSrc(url, true)
  }
}

main()
