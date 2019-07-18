# svg-thumbnailer

## Overview

Convert almost any image into a [vibrant](https://github.com/lokesh/color-thief/), [optimized](https://npm.im/svgo) SVG with NodeJS.

## Usage (lib)

```javascript
const toSvg = require('svg-thumbnailer')

const options = {}

const svgObj = await toSvg('./my/img.jpg', options)
const {data, info: {height, width}} = svgObj
```

### Options (= `default`)

- .colors = `4`
- .scale = `1`
- .vibrant = `true` - via [color-thief](https://github.com/lokesh/color-thief/)
  - tries to quantize palette with most "vibrant"/prominent colors.
  - may not look as good with a high amount of `.colors`.

### Optimizations

- .tolerance = `0.0` (range: `0.0 - 3.0`) - via [simplify-js](https://github.com/mourner/simplify-js)
  - when `> 0.0`, tries to reduce amount of line points (higher = less points).
- .decimalPlaces = `true`
  - when `false`, tries to round many X,Y points to nearest integer.
- .smooth = `0.0` (range: `0.0 - 0.3`)
  - when `> 0.0` tries to round out harsh line corners with bezier curves (higher = more rounded).
  - WARNING: _significant_ increase of file size!

## Usage (cli)

`npm install -g svg-thumbnailer`

`svg-thumbnailer {image-path} {options?}`

Eg. `svg-thumbnailer "/path/to/local/images/folder/img.jpg" --colors=4 --vibrant=true`

Eg. `svg-thumbnailer "/path/to/local/images/folder/" --colors=4 --vibrant=true`

### Options

- writeFileWithTag (eg. `svg`)
  - writes to file, using the image's file name as prefix. Otherwise, writes to console.
- clobberFile = `true`
  - when `false`, if the output file already exists, it is skipped.

## Quality

`$ npm t`

`$ npm run lint`

## Supported Filetypes

- .png
- .jpeg|.jpg

## Sample

![cartoon dog](resources/cartoon-dog.jpg)

`$ svg-thumbnailer ./resources/cartoon-dog.jpg --writeFileWithTag=svg --colors=6`

![cartoon dog svg](resources/cartoon-dog.jpg.svg?sanitize=true)
