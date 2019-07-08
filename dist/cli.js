#!/usr/bin/env node
"use strict";var validateArgs={colors:Number,scale:Number,smooth:Number,tolerance:Number,writeFileWithTag:String};const fs=require("fs");var dir=new function(){this.scan=async function(r,t){if(""===r||"/"===r)return console.error("Error: directory to scan cannot be empty."),console.error('If you want to scan your script location, please use "dir2array.Scan(__dirname);"'),null;if("/"!==r.slice(-1)&&(r+="/"),!this.dirExists(r))return;const s=async r=>fs.readdirSync(r).sort().reduce(async(e,i)=>{await e;const n=r+i;return this.dirExists(n)?s(n+"/"):t(n)},Promise.resolve());return s(r)},this.dirExists=function(r){try{return fs.lstatSync(r).isDirectory()}catch(r){return!1}},this.fileExists=function(r){try{return fs.existsSync(r)}catch(r){return!1}}};const fs$1=require("fs"),toSvg=require(".");function formatOutput(r,t){let s=[];return t&&s.push("FILENAME="+t+":"),s.push(r),t&&s.push("[EOF]"),s=s.join("\n")}async function main(){const r=process.argv.slice(2),[t,...s]=r;t||console.log("run: svg-thumbnailer {image-path} {options?}");const e=s.reduce((r,t)=>{const[s,e]=t.replace(/^--?/,"").split("=");return validateArgs[s]&&(r[s]=validateArgs[s](e)),r},{}),{writeFileWithTag:i}=e,n=async(r,t)=>{if(!t&&!r.match(/\.(jpe?g|png)$/i))return;const{data:s}=await toSvg(r,e).catch(console.log),n=formatOutput(s,i?void 0:r);i?fs$1.writeFileSync(`${r}.${i}`,n,"utf-8"):console.log(n)};dir.dirExists(t)?await dir.scan(t,n):n(t,!0)}main();
