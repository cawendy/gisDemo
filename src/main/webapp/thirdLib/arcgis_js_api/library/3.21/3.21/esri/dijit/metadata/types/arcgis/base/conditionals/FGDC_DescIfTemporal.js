// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/base/conditionals/FGDC_DescIfTemporal","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/has ../../../../../../kernel dojo/i18n!../../../../nls/i18nArcGIS ../../../../base/Conditional ../../../../base/etc/docUtil".split(" "),function(b,f,n,e,g,h,k,l,p){b=b(l,{key:"FGDC_DescIfTemporal",postCreate:function(){this.inherited(arguments);var d=this;this.own(e.subscribe("gxe/interaction-occurred",function(a){try{if(d.parentXNode&&a&&a.inputWidget&&
a.inputWidget.parentXNode){var c=a.inputWidget.parentXNode.gxePath;null!=c&&0<c.indexOf("exDesc")&&d.emitInteractionOccurred()}}catch(m){console.error(m)}}));this.own(e.subscribe("gxe/optional-content-toggled",function(a){try{d.parentXNode&&a&&a.src&&a.src.target&&"tempEle"===a.src.target&&d.emitInteractionOccurred()}catch(c){console.error(c)}}))},validateConditionals:function(d){var a=this.newStatus({message:k.conditionals[this.key]}),c=!0,b=this.parentXNode.parentElement,e=b.gxePath+"/tempEle";
this.focusNode||(this.focusNode=this.parentXNode.inputWidget.focusNode);this.isXNodeOff(this.parentXNode)||this.isXNodeInputEmpty(this.parentXNode)&&this.forActiveXNodes(e,b.domNode,function(a){c=!1});a.isValid=c;this.track(a,d);return a}});g("extend-esri")&&f.setObject("dijit.metadata.types.arcgis.base.conditionals.FGDC_DescIfTemporal",b,h);return b});