/**
 * Created by 80231765 on 2017/9/5.
 */
define(
	[
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/topic",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/dom-style",
		"dojo/on",
		"esri/tasks/QueryTask",
		"esri/tasks/query",
		"dojo/query",
		"dojo/dom",
		"dijit/form/Select",
		"dijit/form/FilteringSelect",
		"dijit/form/Button",
		"dojo/store/Memory",
		"dojo/json",
		"dijit/_WidgetBase",
		"dijit/_TemplatedMixin",
		"dojo/text!./templates/Template.html",
		"dojo/domReady!"
	],
	function (declare, lang, topic,domClass, domConstruct,domStyle, on,QueryTask, Query,query,dom,Select,FilteringSelect,Button,Memory, json,_WidgetBase,_TemplatedMixin,Template) {
		return declare([_WidgetBase,_TemplatedMixin], {
			templateString:Template,
			widgetInTemplate:true,//包含的组件在destroy中一并销毁
			container:null,
			map:null,
			serviceUrl:null,
			dataMemory:null,
			constructor:function (args) {

				this.map = args.map;
				this.serviceUrl = args.serviceUrl;
				this.container  =args.container;
				FuzzySearch = this;
				//  this.map = args.map;
			},

			postMixInProperties:function () {
				this.inherited(arguments);
			},

			postCreate:function () {
				this.init();
				this.addEvents();
				this.inherited(arguments);
			},

			startup:function () {
				this.inherited(arguments);
			},

			init:function () {
				this.dataLoad();
				domConstruct.place(this.domNode, this.container);
			},
			addEvents:function () {
				this.inputInfo.addEventListener('input',lang.hitch(this,this.inputChange));
				this.inherited(arguments);
			},
			inputChange:function (e) {
				var content = e.currentTarget.value;
				console.log(e);
				this.customList.innerHTML = "";
				//var dataArr = this.dataMemory.data;
				var dataArr = this.fuzzySearch(content);
				var len = dataArr.length;
				if(len==0){
					return;
				}
				/*
				if(len > 30){
					dataArr = dataArr.slice(0,10);
					len = 30;
				}*/
				var addressArr = [];
				for(var i=0;i<len;i++){
					var op=document.createElement("option");
					if(dataArr[i].name.indexOf(content)> -1){
						op.setAttribute("value",dataArr[i].address);
						op.setAttribute("label",dataArr[i].name);
						op.setAttribute("data-type","name");
						op.setAttribute("class","itemClass");
						this.customList.appendChild(op);
					}
					else{
						addressArr.push(dataArr[i]);
					}
				}
				var addressArrlen = addressArr.length;
				console.log("addressArrlen" + addressArrlen);
				console.log("addressArr" + addressArr);
				for(var i = 0;i<addressArrlen;i++){
					var op=document.createElement("option");
					op.setAttribute("value",addressArr[i].name);
					op.setAttribute("label",addressArr[i].address);
					op.setAttribute("data-type","address");
					op.setAttribute("class","itemClass");
					this.customList.appendChild(op);
				}
			},
			dataLoad:function () {
				//var queryTask = new QueryTask("http://99.12.88.47:6080/arcgis/rest/services/crm/crmbranch/MapServer/0");
				var queryTask = new QueryTask(this.serviceUrl );
				var query = new Query();
				query.outFields=["*"];
				query.where="1=1";
				//query.geometry = map.extent;
				query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
				query.returnGeometry = true;
				queryTask.execute(query, lang.hitch(this, function (result) {
						var features = result.features;
						var dataArr = [];
						for(var i=0;i<features.length;i++) {
							var obj = {
								"name": features[i].attributes.name,
								"address": features[i].attributes.address,
								"classification": features[i].attributes.classification,
								"id": features[i].attributes.id,
								"geometry": features[i].geometry
							};
							dataArr.push(obj);
						}
						this.dataMemory(dataArr);
				}));
			},
			dataMemory:function (dataArr) {
				this.dataMemory = new Memory({
					idProperty: "name",
					data: dataArr
				});
			},
			fuzzySearch:function (value) {
				return	this.dataMemory.query(function(object){
					if(object.name.indexOf(value)> -1){
						var valueLen= value.length;
						if(object.name.substr(0,valueLen) == value)
						{
							return object;
						}
					}else if(object.address.indexOf(value) > -1){
						var valueLen= value.length;
						if(object.address.substr(0,valueLen) == value)
						{
							return object;
						}
					}
				});
			},
			searchClick:function () {
				//this.listInfo.innerHTML = "";
				var content = this.inputInfo.value;
				var selectedBranch = this.dataMemory.query(function(object){
					if(object.name === content){
							return object;
					}else if(object.address ===content){
							return object;
					}
				});
				//console.log(selectedBranch);
				this.map.centerAndZoom(selectedBranch[0].geometry,12);
				//this.inputInfo.value = "Hello World";

			},
			selectOption:function (event) {
				this.inputInfo.value = event.target.label;
				var label =event.target.label;
				var value = event.target.value;
				var type = event.target.dataset["type"];
				this.customList.innerHTML = "";
				//精准匹配
				var selectedBranch = this.dataMemory.query(function(object){
					if(type == "name"){
						if((object.name === label)&&(object.address == value)){
							return object;
						}
					}
					if(type == "address"){
						if((object.name === value)&&(object.address == label)){
							return object;
						}
					}
				});
				//地图定位
				this.map.centerAndZoom(selectedBranch[0].geometry,12);
			},
			destroy:function () {
				this.inherited(arguments);
			},
		});
	});