const SVGO = require('svgo')

module.exports = new SVGO({
  plugins: [{
    cleanupAttrs: true
  }, {
    inlineStyles: true
  }, {
    removeDoctype: true
  }, {
    removeXMLProcInst: true
  }, {
    removeComments: true
  }, {
    removeMetadata: true
  }, {
    removeTitle: true
  }, {
    removeDesc: true
  }, {
    removeUselessDefs: true
  }, {
    removeXMLNS: false
  }, {
    removeEditorsNSData: true
  }, {
    removeEmptyAttrs: true
  }, {
    removeHiddenElems: true
  }, {
    removeEmptyText: true
  }, {
    removeEmptyContainers: true
  }, {
    removeViewBox: true
  }, {
    cleanupEnableBackground: true
  }, {
    minifyStyles: true
  }, {
    convertStyleToAttrs: true
  }, {
    convertColors: true
  }, {
    convertPathData: true
  }, {
    convertTransform: true
  }, {
    removeUnknownsAndDefaults: true
  }, {
    removeNonInheritableGroupAttrs: true
  }, {
    removeUselessStrokeAndFill: true
  }, {
    removeUnusedNS: true
  }, {
    prefixIds: true
  }, {
    cleanupIDs: true
  }, {
    cleanupNumericValues: true
  }, {
    cleanupListOfValues: true
  }, {
    moveElemsAttrsToGroup: true
  }, {
    moveGroupAttrsToElems: true
  }, {
    collapseGroups: true
  }, {
    removeRasterImages: true
  }, {
    mergePaths: true
  }, {
    convertShapeToPath: true
  }, {
    sortAttrs: true
  }, {
    removeDimensions: true
  }, {
    removeAttrs: false
  }, {
    removeAttributesBySelector: false
  }, {
    removeElementsByAttr: true
  }, {
    removeOffCanvasPaths: true
  }, {
    removeStyleElement: true
  }, {
    removeScriptElement: true
  }, {
    reusePaths: true
  }]
})
