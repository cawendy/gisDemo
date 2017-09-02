// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/AnimationHelper","../../declare dojo/_base/array dojo/_base/lang dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/sniff dojo/on dojo/Deferred".split(" "),function(p,u,q,f,v,w,k,r,t){var h,m;m=!(29>k("chrome")||23>k("ff")||6>k("safari")||10>k("ie"));h=function(a,e){for(var c=function(a){var c=a.type;h=c;for(var d in b)d!==c&&(b[d].remove(),delete b[d]);e.apply(this,arguments)},b={},f=["animationend","webkitAnimationEnd"],g=0;g<f.length;g++)b[f[g]]=r(a,f[g],
c);return{remove:function(){for(var a in b)b.hasOwnProperty(a)&&b[a].remove()}}};var x=p(null,{_oldNode:null,_targets:null,_deferred:null,start:function(a,e){this._oldNode=e;this._deferred=new t;if(!m)return this.finish(),this._deferred.promise;this._targets=a;r.once(a[0].node,h,q.hitch(this,this.finish));for(var c=0;c<a.length;c++){var b=a[c];f.add(b.node,b.classes);f.add(b.node,"Anim_Common")}return this._deferred.promise},finish:function(){if(this._targets){for(var a=0;a<this._targets.length;a++){var e=
this._targets[a];f.remove(e.node,e.classes);f.remove(e.node,"Anim_Common")}this._targets=null}this._oldNode&&(v.destroy(this._oldNode),this._oldNode=null);this._deferred.resolve()}});return p(null,{progress:null,_items:null,_flySurfaceNode:null,_ltr:w.isBodyLtr(),constructor:function(a){this._flySurfaceNode=a;this._items=[]},start:function(a,e){var c=new x;this._items.push(c);this.progress||(this.progress=new t);return c.start(a,e).then(q.hitch(this,this._onItemFinished,c))},_onItemFinished:function(a){a=
u.indexOf(this._items,a);0<=a&&(this._items.splice(a,1),0===this._items.length&&this.progress&&(this.progress.resolve(),this.progress=null))},finish:function(){for(var a=this._items;0<a.length;)a[a.length-1].finish()},fly:function(a,e,c,b){b=b||a.cloneNode(!0);c||(c=["top",this._ltr?"left":"right"]);if(!m)return b;a=a.getBoundingClientRect();var k=this._flySurfaceNode.getBoundingClientRect();f.add(b,"Anim_FlyingObj");for(var g,h,n=0;n<c.length;n++){var d=c[n],l=a[d]-k[d];if("right"===d||"bottom"===
d)l=-l;if("left"===d&&!this._ltr||"right"===d&&this._ltr)g=d,h=l;b.style[d]=l+"px"}this._flySurfaceNode.appendChild(b);g&&(h+=a.width-b.getBoundingClientRect().width,b.style[g]=h+"px");this.start([{node:b,classes:[e]}],b);return b}})});