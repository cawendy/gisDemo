// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/tiling/TileCoverage",["require","exports","../../../core/ObjectPool","../../../core/ArrayPool","./TileSpan"],function(a,l,e,c,f){a=function(){function a(a){this.lodInfo=a;this.spans=c.acquire()}a.prototype.release=function(){for(var a=0,d=this.spans;a<d.length;a++)f.pool.release(d[a]);c.release(this.spans)};a.prototype.forEach=function(a,d){var g=this.spans,h=this.lodInfo,c=h.level;if(0!==g.length)for(var k=0;k<g.length;k++)for(var b=g[k],e=b.row,f=b.colTo,
b=b.colFrom;b<=f;b++)a.call(d,c,e,h.normalizeCol(b),h.getWorldForColumn(b))};return a}();a.pool=new e(a,!0);return a});