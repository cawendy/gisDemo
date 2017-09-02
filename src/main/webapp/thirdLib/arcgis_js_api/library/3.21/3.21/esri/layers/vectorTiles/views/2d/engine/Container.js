// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/Container",["require","exports","../../../core/tsSupport/extendsHelper","./DisplayObject"],function(k,l,g,h){var d;(function(c){c[c.BEFORE=0]="BEFORE";c[c.ATTACHING=1]="ATTACHING";c[c.DETACHING=2]="DETACHING";c[c.RENDERING=3]="RENDERING";c[c.AFTER=4]="AFTER";c[c.DONE=5]="DONE"})(d||(d={}));return function(c){function b(){var a=null!==c&&c.apply(this,arguments)||this;a._childrenSet=new Set;a._childrenToAttach=[];a._childrenToDetach=[];a._renderPhase=
d.DONE;a.children=[];return a}g(b,c);Object.defineProperty(b.prototype,"numChildren",{get:function(){return this.children.length},enumerable:!0,configurable:!0});b.prototype.detach=function(a){var e=this.children;a=this.prepareChildrenRenderParameters(a);for(var b=e.length,c=0;c<b;c++){var d=e[c];d.attached&&(this.detachChild(d,a),d.attached=!1,d.parent=null)}};b.prototype.doRender=function(a){var e=this.prepareChildrenRenderParameters(a);this._renderPhase=d.BEFORE;this.beforeRenderChildren(a,e);
this._renderPhase=d.ATTACHING;this.attachChildren(e)||this.requestRender();this._renderPhase=d.DETACHING;for(var b=this._childrenToDetach;0<b.length;){var c=b.shift();this.detachChild(c,e);c.attached=!1;c.parent=null}this._renderPhase=d.RENDERING;this.renderChildren(e);this._renderPhase=d.AFTER;this.afterRenderChildren(a,e);this._renderPhase=d.DONE};b.prototype.addChild=function(a){return this.addChildAt(a,this.children.length)};b.prototype.addChildAt=function(a,e){void 0===e&&(e=this.numChildren);
if(!a||this.contains(a))return a;var b=a.parent;b&&b!==this&&b.removeChild(a);e>=this.numChildren?this.children.push(a):this.children.splice(e,0,a);this._childrenSet.add(a);b=this._childrenToDetach.indexOf(a);-1<b&&this._childrenToDetach.splice(b,1);this._childrenToAttach.push(a);this._renderPhase>=d.RENDERING&&this.requestRender();return a};b.prototype.contains=function(a){return this._childrenSet.has(a)};b.prototype.getChildIndex=function(a){return this.children.indexOf(a)};b.prototype.getChildAt=
function(a){return 0>a||a>this.children.length?null:this.children[a]};b.prototype.removeAllChildren=function(){for(var a=this.numChildren;a--;)this.removeChildAt(0)};b.prototype.removeChild=function(a){return this.contains(a)?this.removeChildAt(this.getChildIndex(a)):a};b.prototype.removeChildAt=function(a){if(0>a||a>=this.children.length)return null;a=this.children.splice(a,1)[0];this._childrenSet["delete"](a);if(a.attached)this._childrenToDetach.push(a),this._renderPhase>=d.RENDERING&&this.requestRender();
else{var b=this._childrenToAttach.indexOf(a);-1<b&&this._childrenToAttach.splice(b,1)}return a};b.prototype.requestChildRender=function(a){a&&a.parent===this&&this._renderPhase>=d.RENDERING&&this.requestRender()};b.prototype.setChildIndex=function(a,b){var e=this.getChildIndex(a);-1<e&&(this.children.splice(e,1),this.children.splice(b,0,a),this._renderPhase>=d.RENDERING&&this.requestRender())};b.prototype.sortChildren=function(a){this._renderPhase>d.RENDERING&&this.requestRender();return this.children.sort(a)};
b.prototype.attachChildren=function(a){var b=this._childrenToAttach;if(0===b.length)return!0;for(var c=0===b.length;!c;)c=b.shift(),this.attachChild(c,a)&&(c.attached=!0,c.parent=this),c=0===b.length;return 0===b.length};b.prototype.renderChildren=function(a){for(var b=this.children,c=b.length,d=0;d<c;d++){var f=b[d];f.attached&&this.renderChild(f,a)}};b.prototype.beforeRenderChildren=function(a,b){};b.prototype.attachChild=function(a,b){return a.attach(b)};b.prototype.detachChild=function(a,b){a.detach(b)};
b.prototype.renderChild=function(a,b){a.processRender(b)};b.prototype.afterRenderChildren=function(a,b){};return b}(h)});