// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/PopupBase","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/Color dojo/_base/Deferred dojo/has ./kernel ./graphic ./geometry/Point ./geometry/jsonUtils ./geometry/mathUtils ./geometry/webMercatorUtils ./symbols/SimpleMarkerSymbol ./symbols/SimpleLineSymbol ./symbols/CartographicLineSymbol ./symbols/SimpleFillSymbol ./tasks/query ./Evented dojo/has!extend-esri?./PopupInfo".split(" "),function(t,p,l,q,y,z,A,B,C,D,E,v,w,r,u,x,F,G){function H(a){return"sizeInfo"===a.type}t=
t(G,{declaredClass:"esri.PopupBase",_featureLayers:{},_updateEndHandles:[],_evtMap:{"set-features":!0,"clear-features":!0,"selection-change":!0,"dfd-complete":!0},onSetFeatures:function(){},onClearFeatures:function(){},onSelectionChange:function(){},onDfdComplete:function(){},initialize:function(){this.count=0;this.selectedIndex=-1;this.on("clear-features",p.hitch(this,this._resetUpdateEndListeners));this.on("dfd-complete",p.hitch(this,this._processFeatures));this.on("set-features",p.hitch(this,this._processFeatures))},
cleanup:function(){this.features=this.deferreds=null;this._resetUpdateEndListeners()},setFeatures:function(a){if(a&&a.length){this.clearFeatures();var b,c;a[0]instanceof y?c=a:b=a;b?this._updateFeatures(null,b):(this.deferreds=c,c=c.slice(0),l.forEach(c,function(a){a.addBoth(p.hitch(this,this._updateFeatures,a))},this))}},clearFeatures:function(){this.features=this.deferreds=this._marked=null;this.count=0;var a=this.selectedIndex;this.selectedIndex=-1;if(-1<a)this.onSelectionChange();this.onClearFeatures()},
getSelectedFeature:function(){var a=this.features;if(a)return a[this.selectedIndex]},select:function(a){0>a||a>=this.count||(this.selectedIndex=a,this.onSelectionChange())},enableHighlight:function(a){this._highlighted=a.graphics.add(new B(new C(0,0,a.spatialReference)));this._highlighted.hide();this.markerSymbol||(a=this.markerSymbol=new w,a.setStyle(w.STYLE_TARGET),a._setDim(16,16,0),a.setOutline(new u(r.STYLE_SOLID,new q([0,255,255]),2,u.CAP_ROUND,u.JOIN_ROUND)),a.setColor(new q([0,0,0,0])));this.lineSymbol||
(this.lineSymbol=new r(r.STYLE_SOLID,new q([0,255,255]),2));this.fillSymbol||(this.fillSymbol=new x(x.STYLE_NULL,new r(r.STYLE_SOLID,new q([0,255,255]),2),new q([0,0,0,0])))},disableHighlight:function(a){var b=this._highlighted;b&&(b.hide(),a.graphics.remove(b),delete this._highlighted);this.markerSymbol=this.lineSymbol=this.fillSymbol=null},showHighlight:function(){var a=this.features&&this.features[this.selectedIndex];this._highlighted&&a&&a.geometry&&this._highlighted.show()},hideHighlight:function(){this._highlighted&&
this._highlighted.hide()},updateHighlight:function(a,b){var c=b.geometry,e=this._highlighted;if(c&&e){e.hide();!e._graphicsLayer&&a&&a.graphics.add(e);e.setGeometry(D.fromJson(c.toJson()));var d;switch(c.type){case "point":case "multipoint":var f=b.getLayer(),c=b.symbol||f&&f._getSymbol(b);if(f&&c){var h,k,m=0,n=0,g=0;d=b.symbol?null:f._getRenderer(b);if(f=this._getSizeInfo(d))h=k=d.getSize(b,{sizeInfo:f,shape:c.style,resolution:a&&a.getResolutionInMeters&&a.getResolutionInMeters()});else switch(c.type){case "simplemarkersymbol":h=
k=c.size||0;break;case "picturemarkersymbol":h=c.width||0,k=c.height||0}m=c.xoffset||0;n=c.yoffset||0;g=c.angle||0;d=this.markerSymbol;d.setOffset(0,0);d.setAngle(0);h&&k&&d._setDim(h+1,k+1,0);d.setOffset(m,n);d.setAngle(g)}break;case "polyline":d=this.lineSymbol;break;case "polygon":d=this.fillSymbol}e.setSymbol(d)}else e&&e.hide()},showClosestFirst:function(a){var b=this.features;if(b&&b.length){if(1<b.length){var c,e=Infinity,d=-1,f,h=E.getLength,k,m=a.spatialReference,n,g;a=a.normalize();for(c=
b.length-1;0<=c;c--)if(f=b[c].geometry){n=f.spatialReference;k=0;try{g="point"===f.type?f:f.getExtent().getCenter(),g=g.normalize(),m&&n&&!m.equals(n)&&m._canProject(n)&&(g=m.isWebMercator()?v.geographicToWebMercator(g):v.webMercatorToGeographic(g)),k=h(a,g)}catch(I){}0<k&&k<e&&(e=k,d=c)}0<d&&(b.splice(0,0,b.splice(d,1)[0]),this.select(0))}}else this.deferreds&&(this._marked=a)},_unbind:function(a){a=l.indexOf(this.deferreds,a);if(-1!==a)return this.deferreds.splice(a,1),this.deferreds.length?1:(this.deferreds=
null,2)},_fireComplete:function(a){var b=this._marked;b&&(this._marked=null,this.showClosestFirst(b));this.onDfdComplete(a)},_updateFeatures:function(a,b){if(a){if(this.deferreds){var c=this._unbind(a);if(c)if(b&&b instanceof Error){if(this._fireComplete(b),2===c)this.onSetFeatures()}else if(b&&b.length)if(this.features){var e=l.filter(b,function(a){return-1===l.indexOf(this.features,a)},this);this.features=this.features.concat(e);this.count=this.features.length;this._fireComplete();if(2===c)this.onSetFeatures()}else{this.features=
b;this.count=b.length;this.selectedIndex=0;this._fireComplete();if(2===c)this.onSetFeatures();this.select(0)}else if(this._fireComplete(),2===c)this.onSetFeatures()}}else this.features=b,this.count=b.length,this.selectedIndex=0,this.onSetFeatures(),this.select(0)},_getSizeInfo:function(a){return a?a.sizeInfo||l.filter(a.visualVariables,H)[0]:null},_resetUpdateEndListeners:function(){this._featureLayers={};l.forEach(this._updateEndHandles,function(a){a.remove()});this._updateEndHandles=[]},_processFeatures:function(){l.forEach(this.features,
function(a){(a=a.getLayer())&&!this._featureLayers[a.id]&&(1===a.currentMode||0===a.currentMode&&6===a.mode)&&a.objectIdField&&a.hasXYFootprint&&a.queryFeatures&&("esriGeometryPolygon"===a.geometryType||"esriGeometryPolyline"===a.geometryType||a.hasXYFootprint())&&(this._featureLayers[a.id]=a,a=a.on("update-end",p.hitch(this,this._fLyrUpdateEndHandler)),this._updateEndHandles.push(a))},this)},_fLyrUpdateEndHandler:function(a){if(!a.error){var b=this,c=a.target,e=c.getSelectedFeatures(),d=0===c.currentMode&&
6===c.mode,f={},h=[];l.forEach(this.features,function(a){if(a.getLayer()===c){var b=a.attributes[c.objectIdField];f[b]=a;h.push(b)}});h.length&&(a=new F,a.objectIds=h,c.queryFeatures(a,function(a){l.forEach(a.features,function(a){var b=f[a.attributes[c.objectIdField]],g=!1;b.geometry!==a.geometry?(b.setGeometry(a.geometry),g=!0):d&&e&&-1!==l.indexOf(e,a)&&(g=!0);g&&this._highlighted&&b===this.getSelectedFeature()&&this._highlighted.setGeometry(a.geometry)},b)}))}}});z("extend-esri")&&(A.PopupBase=
t);return t});