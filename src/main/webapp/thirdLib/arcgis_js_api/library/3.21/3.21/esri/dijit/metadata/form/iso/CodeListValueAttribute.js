// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/form/iso/CodeListValueAttribute",["dojo/_base/declare","dojo/_base/lang","dojo/has","../Attribute","../../../../kernel"],function(a,b,c,d,e){a=a([d],{isIsoCodeListValue:!0,minOccurs:1,showHeader:!1,target:"codeListValue",postCreate:function(){this.inherited(arguments)},resolveMinOccurs:function(){return this.parentElement?this.parentElement.resolveMinOccurs():this.minOccurs}});c("extend-esri")&&b.setObject("dijit.metadata.form.iso.CodeListValueAttribute",a,e);return a});