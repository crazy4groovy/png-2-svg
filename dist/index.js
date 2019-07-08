"use strict";const fs=require("fs"),PNGReader=require("png.js"),JPEGReader=require("jpeg-js"),ImageTracer=require("imagetracerjs"),SVGO=require("svgo"),dataOptimize=require("./data-optimize"),svgo=new SVGO({plugins:require("./svgo-plugins")}),toSvg=ImageTracer.imagedataToSVG;async function getImgData(e){const t=fs.readFileSync(e);if(e.endsWith("png")){const e=new PNGReader(t),a=await new Promise((t,a)=>{e.parse((e,r)=>{e?a(e):t(r)})});return{height:a.height,width:a.width,data:a.pixels}}return JPEGReader.decode(t)}async function svgThumbnailer(e,{colors:t=4,scale:a=2,tolerance:r=.2,smooth:i=0}={}){const s=await getImgData(e),o=Math.ceil(128/t**2)+1,n={scale:a,ltres:o,qtres:o,colorquantcycles:t,numberofcolors:t},c=await svgo.optimize(toSvg(s,n));if(!r&&!i)return c;const g={smooth:i,tolerance:r},u=dataOptimize(c.data,g);return{...c,data:u}}module.exports=svgThumbnailer;
