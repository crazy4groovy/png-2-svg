# svg-thumbnailer

## Overview

Convert almost any image into optimized SVG with NodeJS.

## Usage (lib)

```javascript
const toSvg = require('svg-thumbnailer')

const opts = {}

const svgString = await toSvg('./my/img.jpg', opts)
```

## Options (= `default`)

- .colors = `4`

## Usage (cli)

`npm install -g svg-thumbnailer`

`svg-thumbnailer {image-path} {options?}`

Eg. `svg-thumbnailer "/path/to/local/images/folder/" --colors=4`

- supports option: `--writeFileWithTag="svg"`

## Quality

`$ npm t`

`$ npm run lint`

## Supported Filetypes

- .png
- .jpeg|.jpg
