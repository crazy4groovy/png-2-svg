"use strict";const simplifyjs=require("simplify-js"),bezierSmooth=require("./bezier-smooth");function optimizeLineCmd(e,{tolerance:t,smooth:s,smoothDecimalPlaces:o}){const m=e.match(/-?\d+ */g),r=m.reduce((e,t,s)=>(s%2==1&&e.push([Number(m[s-1]),Number(m[s])]),e),[]).map(([e,t])=>({x:e,y:t})),i=simplifyjs(r,Math.min(t,5),!0);if(s){const e=i.map(({x:e,y:t})=>[e,t]);return bezierSmooth(e,{smooth:s,smoothDecimalPlaces:o})}return i.reduce((e,{x:t,y:s})=>{return e+(1===e.length||t<0?"":" ")+t+(s<0?"":" ")+s},"l")}module.exports=function(e,{tolerance:t=.2,combineLines:s=!1,smooth:o,smoothDecimalPlaces:m}){const r=e.match(/d="([^"]+)"/g),i=r.map(e=>e.substring(3,e.length-1)).map(e=>e.match(/[a-z][^a-z]*/gi)).map(e=>e.map(e=>{if(!t||!s)return e;const o=e[0];return"h"===o?`l${e.substr(1)} 0`:"v"===o?`l0 ${e.substr(1)}`:e}));let n="";return i.map(e=>e.reduce((e,s)=>{const r=s[0];if("l"!==r&&n.length>0){e+=optimizeLineCmd(n,{tolerance:t,smooth:o,smoothDecimalPlaces:m}),n=""}if("l"===r){const e="-"===r[0]||1===n.length?"":" ";n+=e+s.substr(1)}else e+=s;return e},"")).reduce((e,t,s)=>e.replace(new RegExp(r[s]),`d="${t}"`),e)};
