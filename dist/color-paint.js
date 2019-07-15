"use strict";const{getPalette:getPalette}=require("./color-thief");module.exports=function(t,e){const{palette:r}=getPalette(t,e);return r.map(([t,e,r])=>({r:t,g:e,b:r,a:255}))};
