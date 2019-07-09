# svg-thumbnailer

## Overview

Convert almost any image into optimized ([svgo](https://npm.im/svgo)) SVG with NodeJS.

## Usage (lib)

```javascript
const toSvg = require('svg-thumbnailer')

const options = {}

const svgObj = await toSvg('./my/img.jpg', options)
const {data, info: {height, width}} = svgObj
```

## Options (= `default`)

- .colors = `4`
- .scale = `2`

### Optimizations

- .tolerance = `0.0` (range: `0.0 - 3.0`) - via [simplify-js](https://github.com/mourner/simplify-js)
  - when `> 0.0`, tries to reduce amount of line points  (higher = less points).
- .combineLines = `false`
  - when `true`, tries to combine svg path "shortcuts" into one long line segment. May help reduce amount of line points or file size.

----

- .smooth = `0.0` (range: `0.0 - 0.3`) - WARNING: _significant_ increase of file size!
  - when `> 0.0` tries to round out harsh line corners with bezier curves (higher = more rounded).
- .smoothDecimalPlaces = `1` (range: `0 - 3`)
  - when `.smooth > 0.0`, tries to minimize the file size by rounding X,Y points of bezier curve handles (higher = more accurate).

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
