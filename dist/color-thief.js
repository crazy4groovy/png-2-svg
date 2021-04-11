"use strict";
/*
 * Color Thief v2.1.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 * @license
 */module.exports.getPalette=function({data:t},r,e=5){r=Math.min(256,Math.max(2,r)),e=Math.min(20,Math.max(1,e));const n=t.length,s=[];for(let o,r,u,i,c,h=0;h<n;h+=e)o=4*h,r=t[o+0],u=t[o+1],i=t[o+2],c=t[o+3],c>=125&&(r>250&&u>250&&i>250||s.push([r,u,i]));const u=o.quantize(s,r);return{palette:u?u.palette():null,pixelArray:s}};
/*!
* quantize.js Copyright 2008 Nick Rabinowitz.
* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
* @license
*/
/*!
* Block below copied from Protovis: http://mbostock.github.com/protovis/
* Copyright 2010 Stanford Visualization Group
* Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
* @license
*/
const t={map(t,o){const r={};return o?t.map((t,e)=>(r.index=e,o.call(r,t))):t.slice()},naturalOrder:(t,o)=>t<o?-1:t>o?1:0,sum(t,o){const r={};return t.reduce(o?(t,e,n)=>(r.index=n,t+o.call(r,e)):(t,o)=>t+o,0)},max:(o,r)=>Math.max.apply(null,r?t.map(o,r):o)},o=function(){function o(t,o,r){return(t<<10)+(o<<5)+r}function r(t){const o=[];let r=!1;function e(){o.sort(t),r=!0}return{push(t){o.push(t),r=!1},peek:t=>(r||e(),void 0===t&&(t=o.length-1),o[t]),pop:()=>(r||e(),o.pop()),size:()=>o.length,map:t=>o.map(t),debug:()=>(r||e(),o)}}function e(t,o,r,e,n,s,u){this.r1=t,this.r2=o,this.g1=r,this.g2=e,this.b1=n,this.b2=s,this.histo=u}function n(){this.vboxes=new r((o,r)=>t.naturalOrder(o.vbox.count()*o.vbox.volume(),r.vbox.count()*r.vbox.volume()))}function s(r,e){if(!e.count())return;const n=e.r2-e.r1+1,s=e.g2-e.g1+1,u=e.b2-e.b1+1,i=t.max([n,s,u]);if(1===e.count())return[e.copy()];let c=0;const h=[],l=[];let a,f,p,b,g;if(i===n)for(a=e.r1;a<=e.r2;a++){for(b=0,f=e.g1;f<=e.g2;f++)for(p=e.b1;p<=e.b2;p++)g=o(a,f,p),b+=r[g]||0;c+=b,h[a]=c}else if(i===s)for(a=e.g1;a<=e.g2;a++){for(b=0,f=e.r1;f<=e.r2;f++)for(p=e.b1;p<=e.b2;p++)g=o(f,a,p),b+=r[g]||0;c+=b,h[a]=c}else for(a=e.b1;a<=e.b2;a++){for(b=0,f=e.r1;f<=e.r2;f++)for(p=e.g1;p<=e.g2;p++)g=o(f,p,a),b+=r[g]||0;c+=b,h[a]=c}function m(t){const o=t+"1",r=t+"2";let n,s,u,i,f,p=0;for(a=e[o];a<=e[r];a++)if(h[a]>c/2){for(u=e.copy(),i=e.copy(),n=a-e[o],s=e[r]-a,f=n<=s?Math.min(e[r]-1,~~(a+s/2)):Math.max(e[o],~~(a-1-n/2));!h[f];)f++;for(p=l[f];!p&&h[f-1];)p=l[--f];return u[r]=f,i[o]=u[r]+1,[u,i]}}return h.forEach((t,o)=>{l[o]=c-t}),m(i===n?"r":i===s?"g":"b")}return e.prototype={volume(t){const o=this;return o._volume&&!t||(o._volume=(o.r2-o.r1+1)*(o.g2-o.g1+1)*(o.b2-o.b1+1)),o._volume},count(t){const r=this,{histo:e}=r;if(!r._count_set||t){let t,n,s,u,i=0;for(n=r.r1;n<=r.r2;n++)for(s=r.g1;s<=r.g2;s++)for(u=r.b1;u<=r.b2;u++)t=o(n,s,u),i+=e[t]||0;r._count=i,r._count_set=!0}return r._count},copy(){return new e(this.r1,this.r2,this.g1,this.g2,this.b1,this.b2,this.histo)},avg(t){const r=this,{histo:e}=r;if(!r._avg||t){let t=0;const n=8;let s,u,i,c,h,l=0,a=0,f=0;for(u=r.r1;u<=r.r2;u++)for(i=r.g1;i<=r.g2;i++)for(c=r.b1;c<=r.b2;c++)h=o(u,i,c),s=e[h]||0,t+=s,l+=s*(u+.5)*n,a+=s*(i+.5)*n,f+=s*(c+.5)*n;r._avg=t?[~~(l/t),~~(a/t),~~(f/t)]:[~~(n*(r.r1+r.r2+1)/2),~~(n*(r.g1+r.g2+1)/2),~~(n*(r.b1+r.b2+1)/2)]}return r._avg},contains(t){const o=t[0]>>3,r=t[1]>>3,e=t[2]>>3;return o>=this.r1&&o<=this.r2&&r>=this.g1&&r<=this.g2&&e>=this.b1&&e<=this.b2}},n.prototype={push(t){this.vboxes.push({vbox:t,color:t.avg()})},palette(){return this.vboxes.map(t=>t.color)},size(){return this.vboxes.size()},map(t){const{vboxes:o}=this;for(let r=0;r<o.size();r++)if(o.peek(r).vbox.contains(t))return o.peek(r).color;return this.nearest(t)},nearest(t){const{vboxes:o}=this;let r,e,n;for(let s=0;s<o.size();s++)e=Math.sqrt(t[0]-o.peek(s).color[0]**2+t[1]-o.peek(s).color[1]**2+t[2]-o.peek(s).color[2]**2),(e<r||void 0===r)&&(r=e,n=o.peek(s).color);return n},forcebw(){const{vboxes:o}=this;o.sort((o,r)=>t.naturalOrder(t.sum(o.color),t.sum(r.color)));const r=o[0].color;r[0]<5&&r[1]<5&&r[2]<5&&(o[0].color=[0,0,0]);const e=o.length-1,n=o[e].color;n[0]>251&&n[1]>251&&n[2]>251&&(o[e].color=[255,255,255])}},{quantize:function(u,i){if(0===u.length||i<2||i>256)return!1;const c=function(t){const r=new Array(32768);let e,n,s,u;return t.forEach(t=>{n=t[0]>>3,s=t[1]>>3,u=t[2]>>3,e=o(n,s,u),r[e]=(r[e]||0)+1}),r}(u);c.forEach(()=>{});const h=function(t,o){let r,n,s,u=1e6,i=0,c=1e6,h=0,l=1e6,a=0;return t.forEach(t=>{r=t[0]>>3,n=t[1]>>3,s=t[2]>>3,r<u?u=r:r>i&&(i=r),n<c?c=n:n>h&&(h=n),s<l?l=s:s>a&&(a=s)}),new e(u,i,c,h,l,a,o)}(u,c),l=new r((o,r)=>t.naturalOrder(o.count(),r.count()));function a(t,o){let r,e=1,n=0;for(;n<1e3;){if(r=t.pop(),!r.count()){t.push(r),n++;continue}const u=s(c,r),i=u[0],h=u[1];if(!i)return;if(t.push(i),h&&(t.push(h),e++),e>=o)return;if(n++>1e3)return}}l.push(h),a(l,.75*i);const f=new r((o,r)=>t.naturalOrder(o.count()*o.volume(),r.count()*r.volume()));for(;l.size();)f.push(l.pop());a(f,i-f.size());const p=new n;for(;f.size();)p.push(f.pop());return p}}}();
