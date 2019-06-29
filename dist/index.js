"use strict";const fs=require("fs"),PNGReader=require("png.js"),JPEGReader=require("jpeg-js"),ImageTracer=require("imagetracerjs"),{optimize:optimize}=require("./svgo"),toSvg=ImageTracer.imagedataToSVG;async function getImgData(e){const r=fs.readFileSync(e);if(e.endsWith("png")){const e=new PNGReader(r),t=await new Promise((r,t)=>{e.parse((e,a)=>{e?t(e):r(a)})});return{height:t.height,width:t.width,data:t.pixels}}return JPEGReader.decode(r)}async function svgThumbnailer(e,{colors:r=4}={}){const t=await getImgData(e),a=Math.ceil(128/r**2)+1;return optimize(toSvg(t,{scale:5,ltres:a,qtres:a,colorquantcycles:r,numberofcolors:r}))}module.exports=svgThumbnailer;
