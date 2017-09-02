// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/PopupManager","./geometry/Extent ./geometry/ScreenPoint ./kernel ./layerUtils ./tasks/query dijit/registry dojo/_base/array dojo/_base/declare dojo/_base/Deferred dojo/_base/lang dojo/has dojo/on dojo/promise/all dojo/Stateful require".split(" "),function(F,y,G,E,H,I,h,u,v,x,J,K,L,M,N){var z;u=u(M,{declaredClass:"esri.PopupManager",enabled:!1,map:null,_mapClickHandle:null,_featureLayersCache:{},constructor:function(a){this._mapClickHandler=x.hitch(this,this._mapClickHandler)},setMap:function(a){if(this.map)if(a!==
this.map)this.unsetMap();else return;this.map=a;this._setupClickHandler()},unsetMap:function(){this.map&&(this.map=null);this._mapClickHandle&&(this._mapClickHandle.remove(),this._mapClickHandle=null)},getMapLayer:function(a){var c;if(a&&(c=a.getLayer())&&(a=c.id,this._featureLayersCache[a])){var b=a.lastIndexOf("_");-1<b&&(a=a.substring(0,b),c=this.map.getLayer(a))}return c},_enabledSetter:function(a){this.enabled=a;this._setupClickHandler()},_setupClickHandler:function(){this._mapClickHandle&&(this._mapClickHandle.remove(),
this._mapClickHandle=null);this.enabled&&this.map&&(this._mapClickHandle=this.map.on("click",this._mapClickHandler))},_mapClickHandler:function(a){var c=this.map.infoWindow,b=a.graphic;c&&this.map.loaded&&(c.clearFeatures&&c.setFeatures?this._showPopup(a):b&&b.getInfoTemplate()&&this._showInfoWindow(b,a.mapPoint))},_showPopup:function(a){var c=this.map,b=c.infoWindow,d=this,g=[],e=[c.graphics].concat(h.map(c.graphicsLayerIds,c.getLayer,c));h.forEach(e,function(a){a&&a.loaded&&a.infoTemplate&&!a.suspended&&
g.push(a)});var r=[];h.forEach(c.layerIds,function(a){(a=c.getLayer(a))&&a.loaded&&!a.suspended&&(d._isImageServiceLayer(a)&&a.infoTemplate?g.push(a):"esri.layers.WMSLayer"===a.declaredClass&&a.getFeatureInfoURL?g.push(a):"esri.layers.ArcGISDynamicMapServiceLayer"!==a.declaredClass&&"esri.layers.ArcGISTiledMapServiceLayer"!==a.declaredClass||!a.infoTemplates||r.push(a))});this._getSubLayerFeatureLayers(r).then(function(e){g=g.concat(e);var m=null;a.graphic&&a.graphic.getInfoTemplate()&&!d._isImageServiceLayer(a.graphic._layer)&&
(m=a.graphic);if(g.length||m){var l=d._calculateClickTolerance(g),f=a.screenPoint;e=c.toMap(new y(f.x-l,f.y+l));var l=c.toMap(new y(f.x+l,f.y-l)),n=new F(e.x,e.y,l.x,l.y,c.spatialReference);if(n=n.intersects(c.extent)){var p=new H,q=!!m,r=!0;e=h.map(g,function(b){p.timeExtent=b.useMapTime?c.timeExtent:null;var f=d._isAggregationEnabled(b);b=f?b.getAggregationLayer():b;var e;if(d._isImageServiceLayer(b))p.geometry=a.mapPoint,r=!1,e=b.queryVisibleRasters(p,{rasterAttributeTableFieldPrefix:"Raster.",
returnDomainValues:!0}),e.addCallback(function(){var a=b.getVisibleRasters();q=q||0<a.length;return a});else if("esri.layers.WMSLayer"===b.declaredClass){e=new v;var g=b._getPopupGraphic(c,a.screenPoint);g?(e.resolve([g]),q=!0):e.resolve([])}else d._featureLayersCache[b.id]||"function"===typeof b.queryFeatures&&(0===b.currentMode||1===b.currentMode)?(p.geometry=n,e=b.queryFeatures(p),e.addCallback(function(a){a=a.features;a=h.filter(a,function(a){return a.visible});q=q||0<a.length;return a})):(e=
new v,g=h.filter(b.graphics,function(a){return a&&a.visible&&n.intersects(a.geometry)}),f&&d._isParentLayer(b,m)&&(f=d._findGraphicById(g,m,"clusterId"))&&(m=f),q=q||0<g.length,e.resolve(g));return e});m&&(l=new v,l.resolve([m]),e.unshift(l));h.some(e,function(a){return!a.isFulfilled()})||q?(b.setFeatures(e),b.show(a.mapPoint,{closestFirst:r})):(b.hide(),b.clearFeatures())}}})},_getSubLayerFeatureLayers:function(a,c){var b=c||new v,d=[],g=a.length,e=Math.floor(this.map.extent.getWidth()/this.map.width),
r=this.map.getScale(),u=!1,m=this,l=0;a:for(;l<g;l++){var f=a[l],n=f.dynamicLayerInfos||f.layerInfos;if(n){var p=null;f._params&&(f._params.layers||f._params.dynamicLayers)&&(p=f.visibleLayers);for(var p=E._getVisibleLayers(n,p),q=E._getLayersForScale(r,n),y=n.length,B=0;B<y;B++){var A=n[B],t=A.id,w=f.infoTemplates[t];if(!A.subLayerIds&&w&&w.infoTemplate&&-1<h.indexOf(p,t)&&-1<h.indexOf(q,t)){if(!z){u=!0;break a}var C=f.id+"_"+t,k=this._featureLayersCache[C];k&&k.loadError||(k||((k=w.layerUrl)||(k=
A.source?this._getLayerUrl(f.url,"/dynamicLayer"):this._getLayerUrl(f.url,t)),k=new z(k,{id:C,drawMode:!1,mode:z.MODE_SELECTION,outFields:this._getOutFields(w.infoTemplate),resourceInfo:w.resourceInfo,source:A.source}),this._featureLayersCache[C]=k),k.setDefinitionExpression(f.layerDefinitions&&f.layerDefinitions[t]),k.setGDBVersion(f.gdbVersion),k.setInfoTemplate(w.infoTemplate),k.setMaxAllowableOffset(e),k.setUseMapTime(!!f.useMapTime),f.layerDrawingOptions&&f.layerDrawingOptions[t]&&f.layerDrawingOptions[t].renderer&&
k.setRenderer(f.layerDrawingOptions[t].renderer),d.push(k))}}}}if(u){var x=new v;N(["./layers/FeatureLayer"],function(a){z=a;x.resolve()});x.then(function(){m._getSubLayerFeatureLayers(a,b)})}else{var D=[];h.forEach(d,function(a){if(!a.loaded){var b=new v;K.once(a,"load, error",function(){b.resolve()});D.push(b.promise)}});D.length?L(D).then(function(){d=h.filter(d,function(a){return!a.loadError&&a.isVisibleAtScale(r)});b.resolve(d)}):(d=h.filter(d,function(a){return a.isVisibleAtScale(r)}),b.resolve(d))}return b.promise},
_getLayerUrl:function(a,c){var b=a.indexOf("?");return-1===b?a+"/"+c:a.substring(0,b)+"/"+c+a.substring(b)},_getOutFields:function(a){var c;a.info&&"esri.dijit.PopupTemplate"===a.declaredClass?(c=[],h.forEach(a.info.fieldInfos,function(a){var b=a.fieldName&&a.fieldName.toLowerCase();b&&"shape"!==b&&0!==b.indexOf("relationships/")&&c.push(a.fieldName)})):c=["*"];return c},_calculateClickTolerance:function(a){var c=6,b,d;h.forEach(a,function(a){if(b=a.renderer)"esri.renderer.SimpleRenderer"===b.declaredClass?
((d=b.symbol)&&d.xoffset&&(c=Math.max(c,Math.abs(d.xoffset))),d&&d.yoffset&&(c=Math.max(c,Math.abs(d.yoffset)))):"esri.renderer.UniqueValueRenderer"!==b.declaredClass&&"esri.renderer.ClassBreaksRenderer"!==b.declaredClass||h.forEach(b.infos,function(a){(d=a.symbol)&&d.xoffset&&(c=Math.max(c,Math.abs(d.xoffset)));d&&d.yoffset&&(c=Math.max(c,Math.abs(d.yoffset)))})});return c},_showInfoWindow:function(a,c){var b=this.map.infoWindow,d=a.geometry,d=d&&"point"===d.type?d:c,g=a.getContent();b.setTitle(a.getTitle());
if(g&&x.isString(g.id)){var e=I.byId(g.id);e&&e.set&&/_PopupRenderer/.test(e.declaredClass)&&e.set("showTitle",!1)}b.setContent(g);b.show(d)},_findGraphicById:function(a,c,b){var d,g=(c=c.attributes)&&c[b];h.some(a,function(a){var c=a.attributes;c&&c[b]===g&&(d=a);return!!d});return d},_isParentLayer:function(a,c){var b=c&&c.getLayer();return a&&b===a},_isAggregationEnabled:function(a){return a&&a.isAggregationEnabled&&a.isAggregationEnabled()},_isImageServiceLayer:function(a){return"esri.layers.ArcGISImageServiceLayer"===
a.declaredClass||"esri.layers.ArcGISImageServiceVectorLayer"===a.declaredClass}});J("extend-esri")&&(G.PopupManager=u);return u});