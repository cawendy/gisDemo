// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/arcade/arcade","require exports ./arcadeRuntime ./parser ./Feature ./arcadeCompiler dojo/has".split(" "),function(k,a,d,e,f,g,h){Object.defineProperty(a,"__esModule",{value:!0});a.compileScript=function(c,b){return h("csp-restrictions")?function(b,a){return d.executeScript(c,b,a)}:g.compileScript(c,b)};a.constructFeature=function(c){return f.fromFeature(c)};a.parseScript=function(c){return e.parseScript(c)};a.validateScript=function(c,b){return e.validateScript(c,b,"simple")};a.scriptCheck=
function(c,b,a){return e.scriptCheck(c,b,a,"full")};a.parseAndExecuteScript=function(c,b,a){return d.executeScript(e.parseScript(c),b,a)};a.executeScript=function(c,b,a){return d.executeScript(c,b,a)};a.referencesMember=function(c,a){return d.referencesMember(c,a)};a.referencesFunction=function(a,b){return d.referencesFunction(a,b)};a.extractFieldLiterals=function(a,b){void 0===b&&(b=!1);return e.extractFieldLiterals(a,b)}});