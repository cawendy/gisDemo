// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/base/conditionals/INSPIRE_ConformanceResult","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/has ../../../../../../kernel dojo/i18n!../../../../nls/i18nArcGIS ../../../../base/Conditional ../../../../base/etc/docUtil".split(" "),function(c,g,n,e,h,k,l,m,f){c=c(m,{key:"INSPIRE_ConformanceResult",postCreate:function(){this.inherited(arguments);var b=this;this.own(e.subscribe("gxe/interaction-occurred",function(a){try{b.parentXNode&&a&&a.inputWidget&&
a.inputWidget.parentXNode&&"/metadata/dqInfo/report/@type"===a.inputWidget.parentXNode.gxePath&&b.emitInteractionOccurred()}catch(d){console.error(d)}}));this.own(e.subscribe("gxe/optional-content-toggled",function(a){try{b.parentXNode&&a&&a.src&&a.src.target&&"ConResult"===a.src.target&&b.emitInteractionOccurred()}catch(d){console.error(d)}}))},ensureFocus:function(){var b=this.parentXNode.domNode;f.ensureVisibility(this.parentXNode);if(b=this.findElement("/metadata/dqInfo/report/measResult/ConResult",
b))f.ensureVisibility(b),b._isOptionallyOff&&b.toggleContent(!0)},validateConditionals:function(b){var a=this.newStatus({message:l.conditionals[this.key]}),d=!0,c=this.parentXNode.domNode;this.isXNodeOff(this.parentXNode)||"DQDomConsis"!==this.findInputValue("/metadata/dqInfo/report/@type",c)||(d=!1,this.forActiveXNodes("/metadata/dqInfo/report/measResult/ConResult",c,function(a){return d=!0}));a.isValid=d;this.track(a,b);return a}});h("extend-esri")&&g.setObject("dijit.metadata.types.arcgis.base.conditionals.INSPIRE_ConformanceResult",
c,k);return c});