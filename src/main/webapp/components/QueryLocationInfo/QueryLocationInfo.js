/**
 * Created by 80231765 on 2017/9/4.
 */
define(
	[
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/topic",
		"components/QueryLocationInfo/LocationWidget",
		"esri/tasks/QueryTask",
		"esri/tasks/query",
		"esri/geometry/Extent",
		"dojo/on",
		"dojo/store/Memory",
		"esri/symbols/SimpleLineSymbol",
		"esri/symbols/CartographicLineSymbol",
		"esri/graphic",
		"esri/layers/GraphicsLayer",
		"esri/SpatialReference",
		"esri/geometry/webMercatorUtils",
		"esri/Color",
		"esri/geometry/Geometry",
		"esri/geometry/Polygon",
		"esri/InfoTemplate",
	],
	function (declare,lang,topic,LocationWidget,QueryTask,Query,Extent,on,Memory,SimpleLineSymbol,CartographicLineSymbol,Graphic,GraphicsLayer,SpatialReference,webMercatorUtils,Color,
			  Geometry,Polygon,InfoTemplate) {
		return declare(null, {
			locator: null,
			provinceUrl:"",
			cityUrl:"",
			countyUrl:"",
			placeHolder:null,
			map:null,
			drawBorderLayer:null,
			constructor:function (args) {
				//this.map=null;
				this.provinceUrl = args.provinceUrl;
				this.cityUrl = args.cityUrl;
				this.countyUrl = args.countyUrl;
				this.placeHolder = args.placeHolder;
				this.map = args.map;
				this.drawBorderLayer = new esri.layers.GraphicsLayer({className:"drawBorderLayer"});
			},
			/**
			 * 初始化
			 */
			execute:function () {
				this.loadLocationWidget();
				this.startMonitor();
			},
			loadLocationWidget:function () {
				//初始数据，谨防报错
				var tmp = '[{ "no": "2", "name": "Alabama2" },{ "no": "1", "name": "Alabama1" }]';
				var defaultData = {
					"province":tmp,
					"city":tmp,
					"county":tmp
				};
				this.locator = new LocationWidget({
					container:dojo.byId("toolbar"),
					provinceInit:this.placeHolder.province,
					cityInit:this.placeHolder.city,
					countyInit:this.placeHolder.county,
					data:defaultData
				});
				this.locator.startup();
			},
			startMonitor:function () {
				topic.subscribe("mapLoaded",lang.hitch(this,function () {
					this.queryProvince();
					//this.queryCity();
					//this.queryCounty();
				}));
				topic.subscribe("provinceCode",lang.hitch(this,this.queryCity));
				topic.subscribe("cityCode",lang.hitch(this,this.queryCounty));
				topic.subscribe("locationInfo",lang.hitch(this,this.drawCounty));
			},
			drawCounty:function (countyInfo) {
				//var polygon = new Polygon(new SpatialReference({wkid:4326}));
				//polygon.addRing(ringArr);
				var polygon = countyInfo.county.geometry;
				var lineSymbol =  new SimpleLineSymbol(
					SimpleLineSymbol.STYLE_SOLID,
					new Color([255,128,0]),
					3
				);
				var attr = {"rings":"ring"};
				var infoTemplate = new InfoTemplate("Branch Information","rings: ${rings}");
				var border = new Graphic(polygon,lineSymbol,attr,infoTemplate);
				this.drawBorderLayer.clear();
				this.drawBorderLayer.add(border);
				this.map.addLayer(this.drawBorderLayer);

				//var extent = new Extent(this.xMin,this.yMin,this.xMax,this.yMax, new SpatialReference({ wkid:4326 }));
				this.map.setExtent(polygon.getExtent(),true);
			},
			queryProvince:function () {
				var queryTask = new QueryTask(this.provinceUrl);
				var query = new Query();
				query.outFields=["*"];
				query.where="1=1";
				//query.geometry = map.extent;
				query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
				query.returnGeometry = true;
				queryTask.execute(query, lang.hitch(this, function (result) {
					//数据处理
					var features = result.features;
					var dataArr = [];
					for(var i=0;i<features.length;i++){
						var obj = {
							"name":features[i].attributes.Name_CHN,
							"AdminCode":features[i].attributes.AdminCode,
							"geometry":features[i].geometry
						};
						dataArr.push(obj);
					}
					//更新locator数据
					//var tmp1 = [{ "no": "1", "name": "Alabama1" }];
					this.locator.setProvinceData(dataArr);

					//this.locator.provinceSelector.store = provinceData;
					this.locator.provinceSelector.startup();
					this.locator.provinceSelector.disabled = false;
					this.locator.provinceSelector.startup(); //设置更新
				}));
			},
			queryCity:function (proviceCode) {
				var queryTask = new QueryTask(this.cityUrl);
				var query = new Query();
				query.outFields=["*"];
				query.where="AdminCode like '"+proviceCode+"%'";
				//query.geometry = map.extent;
				query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
				query.returnGeometry = true;
				queryTask.execute(query, lang.hitch(this, function (result) {
					//数据处理
					var features = result.features;
					var dataArr = [];
					for(var i=0;i<features.length;i++){
						var obj = {
							"name":features[i].attributes.Name,
							"AdminCode":features[i].attributes.AdminCode,
							"geometry":features[i].geometry
						};
						dataArr.push(obj);
					}
					//更新locator数据
					this.locator.setCityData(dataArr);
					this.locator.citySelector.disabled = false;
					this.locator.citySelector.startup(); //设置更新
				}));
			},
			queryCounty:function (cityCode) {
				var queryTask = new QueryTask(this.countyUrl);
				var query = new Query();
				query.outFields=["*"];
				query.where="AdminCode like '"+cityCode+"%'";
				//query.geometry = map.extent;
				query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
				query.returnGeometry = true;
				queryTask.execute(query, lang.hitch(this, function (result) {
					//数据处理
					var features = result.features;
					var dataArr = [];
					for(var i=0;i<features.length;i++){
						var obj = {
							"name":features[i].attributes.Name_CHN,
							"AdminCode":features[i].attributes.AdminCode,
							"geometry":features[i].geometry
						};
						dataArr.push(obj);
					}
					//更新locator数据
					this.locator.setCountyData(dataArr);
					this.locator.countySelector.disabled = false;
					this.locator.countySelector.startup(); //设置更新
				}));
			},
		});
	});