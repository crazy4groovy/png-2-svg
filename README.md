# svg-thumbnailer

## Overview

Convert almost any image into [optimized](https://npm.im/svgo) SVG with NodeJS.

## Usage (lib)

```javascript
const toSvg = require('svg-thumbnailer')

const options = {}

const svgObj = await toSvg('./my/img.jpg', options)
const {data, info: {height, width}} = svgObj
```

## Options (= `default`)

- .colors = `6`
- .scale = `2`

### Optimizations (via [Paper.js](http://paperjs.org/reference/compoundpath/))

- .tolerance = `10` ([simplify](http://paperjs.org/reference/compoundpath/#simplify))
- .type = `'continuous'` ([smooth](http://paperjs.org/reference/compoundpath/#smooth))
- .factor = `0.2` ([smooth](http://paperjs.org/reference/compoundpath/#smooth))
  - Note: only used for `type`: catmull-rom, or geometric
- .precision = `0` ([exportsvg](http://paperjs.org/reference/compoundpath/#exportsvg))

## Usage (cli)

`npm install -g svg-thumbnailer`

`svg-thumbnailer {image-path} {options?}`

Eg. `svg-thumbnailer "/path/to/local/images/folder/img.jpg" --colors=4`

Eg. `svg-thumbnailer "/path/to/local/images/folder/" --colors=4`

- supports option: `--writeFileWithTag=svg`

## Quality

`$ npm t`

`$ npm run lint`

## Supported Filetypes

- .png
- .jpeg|.jpg

## Sample

![cartoon dog](resources/cartoon-dog.jpg)

`$ svg-thumbnailer ./resources/cartoon-dog.jpg --colors=4`

![cartoon dog svg](resources/cartoon-dog.jpg.svg?sanitize=true)
