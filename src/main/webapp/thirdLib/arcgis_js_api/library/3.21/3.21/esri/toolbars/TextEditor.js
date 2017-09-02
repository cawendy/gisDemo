// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/toolbars/TextEditor","dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/event dojo/has dojo/dom-construct dojo/dom-class dojo/dom-style dojo/keys ../kernel".split(" "),function(b,e,c,k,l,m,n,f,h,p){b=b(null,{declaredClass:"esri.toolbars.TextEditor",constructor:function(a,c,d){this._graphic=a;this._map=c;this._toolbar=d;this._enable(this._graphic)},destroy:function(){this._disable()},onEditStart:function(){},onEditEnd:function(){},_enable:function(a){this._editBox?(c.disconnect(this._addEditBoxHandler),
this._addEditBoxHandler=null):(this._map.navigationManager.setImmediateClick(!0),this._addEditBoxHandler=c.connect(a.getLayer(),"onDblClick",this,function(g){this._map.navigationManager.setImmediateClick(!1);g.graphic==a&&(k.stop(g),c.disconnect(this._addEditBoxHandler),this._addEditBoxHandler=null,this._addTextBox(a))}))},_disable:function(){this._applyEdit();this._addEditBoxHandler&&(c.disconnect(this._addEditBoxHandler),this._addEditBoxHandler=null);this._removeTextBox();this.onEditEnd(this._graphic);
this._toolbar.onTextEditEnd(this._graphic)},_addTextBox:function(a,g){if(!this._editBox){var d;a.symbol.text||(a.symbol.text="Tempt text",a.setSymbol(a.symbol),d="");var q=this._createInputTextStyle(a,this._map);""!==d&&(d=g||a.symbol.text);this._editBox=m.create("input",{type:"text",value:d});f.set(this._editBox,q);n.add(this._editBox,"esriTextEditorInput");this._map.container.appendChild(this._editBox);this._editBox.focus();this._editBoxKeyHandler=c.connect(this._editBox,"onkeyup",e.hitch(this,
function(a){a.keyCode!=h.ENTER&&a.keyCode!==h.TAB||this._disable()}));this._editBoxBlurHandler=c.connect(this._editBox,"onblur",e.hitch(this,function(a){this._disable()}));a.symbol.text="";a.setSymbol(a.symbol);a.hide();var b=this._editBox;this._disableBoxHandler||(this._disableBoxHandler=this._map.on("zoom-start",e.hitch(this,function(){this._disable()})));this._moveBoxHandler=this._map.on("pan",function(a){f.set(b,{left:this._editBoxLeft+a.delta.x+"px",top:this._editBoxTop+a.delta.y+"px"})});this._moveBoxStartHandler=
this._map.on("pan-start",function(){this._editBoxLeft=parseFloat(f.get(b,"left"));this._editBoxTop=parseFloat(f.get(b,"top"))});this.onEditStart(a,this._editBox);this._toolbar.onTextEditStart(a,this._editBox)}},_removeTextBox:function(){this._editBoxBlurHandler&&(c.disconnect(this._editBoxBlurHandler),this._editBoxBlurHandler=null);this._editBox&&(this._editBox.parentNode.removeChild(this._editBox),this._editBox=null);this._disableBoxHandler&&(this._disableBoxHandler.remove(),this._disableBoxHandler=
null);this._moveBoxHandler&&(this._moveBoxHandler.remove(),this._moveBoxHandler=null);this._moveBoxStartHandler&&(this._moveBoxStartHandler.remove(),this._moveBoxStartHandler=null);this._editBoxKeyHandler&&(c.disconnect(this._editBoxKeyHandler),this._editBoxKeyHandler=null)},_createInputTextStyle:function(a,c){var d=a.getDojoShape().getTransformedBoundingBox(),b=a.symbol.font;return{"font-family":b.family,"font-size":b.size+"px","font-style":b.style,"font-variant":b.variant,"font-weight":b.weight,
left:d[0].x+"px",top:d[0].y+"px",width:Math.abs(d[0].x-d[1].x)/Math.cos(a.symbol.angle/180*Math.PI)+"px"}},_applyEdit:function(){if(this._editBox)if(this._editBox.value){this._graphic.show();var a=this._graphic.symbol;a.text=this._editBox.value;this._graphic.setSymbol(a)}else this._graphic.getLayer().remove(this._graphic)}});l("extend-esri")&&e.setObject("toolbars.TextEditor",b,p);return b});