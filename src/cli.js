import validateArgs from './validate-args'
import dir from './dir'
import toSvg from '.'

const fs = require('fs')

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

  const handleSrc = async (filename, noCheckFileTag) => {
    if (!noCheckFileTag && !filename.match(/\.(jpe?g|png)$/i)) {
      return
    }

    const svg = await toSvg(filename, options).catch(console.log)

    const formatFilename = writeFileWithTag ? undefined : filename
    const output = formatOutput(svg, formatFilename)

    if (!writeFileWithTag) {
      console.log(output)
      return
    }

    fs.writeFileSync(`${filename}.${writeFileWithTag}`, output, 'utf-8')
  }

  if (dir.dirExists(url)) {
    await dir.scan(url, handleSrc)
  } else {
    handleSrc(url, true)
  }
}

main()
