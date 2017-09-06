/**
 * Created by 80231765 on 2017/9/6.
 */
/**
 * 地图绘制多个1*1正方形
 * @author    cll
 */
define(
	[
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/on",
		"dojo/topic",
		"esri/geometry/Circle",
		"esri/symbols/Symbol",
		"esri/symbols/SimpleFillSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/graphic",
		"esri/Color",
		"esri/geometry/Point",
		"esri/geometry/Polygon",
		"esri/SpatialReference",
		"esri/geometry/webMercatorUtils",
		"esri/symbols/PictureMarkerSymbol",
		"esri/InfoTemplate",
		"esri/geometry/Extent",
		"esri/tasks/QueryTask",
		"esri/tasks/query",
		"esri/units"
	],
	function (declare, lang, on, topic, Circle, Symbol, SimpleFillSymbol, SimpleLineSymbol,Graphic, Color, Point,Polygon,SpatialReference,webMercatorUtils,PictureMarkerSymbol,InfoTemplate,Extent,QueryTask,Query,units) {

		return declare(null, {
			map:null,
			graphicsLayer:null,
			centerPoint: null,
			radius:3,
			xMin:null,
			yMin:null,
			xMax:null,
			yMax:null,
			constructor:function (args) {
				this.map = args.map;
				//this.graphicsLayer = args.graphicsLayer;
				this.graphicsLayer = new esri.layers.GraphicsLayer({className:"squaresLayer"});
				this.centerPoint = args.centerPoint;
				this.radius = args.radius;
				//this.centerPoint = args.centerPoint;
				//this.radius = args.radius;
			},
			//定义监控事件
			postCreate:function () {
				this.eventsListen();
				this.inherited(arguments);
			},
			startup:function () {
				//this.startDraw();
				this.inherited(arguments);
			},
			eventsListen:function(){
				this.map.on("click",lang.hitch(this,this.myGraphicsClickHandler));
				// 选择绘制的rect时响应
				topic.subscribe("selectRect", lang.hitch(this, this.handleSelectRect));
			},
			startDraw:function(){

				this.xMin = this.centerPoint.x;
				this.yMin = this.centerPoint.y;
				this.xMax = this.centerPoint.x;
				this.yMax = this.centerPoint.y;
				//统计需要rect的数量
				var radiusRect = this.radius;
				//按照列进行画rect,j表示列，i表行
				for(var j= -radiusRect;j<radiusRect;j++){
					for(var i=-radiusRect;i<radiusRect;i++){
						var geom = webMercatorUtils.geographicToWebMercator(this.centerPoint);
						geom.x = geom.x + i*1000;
						geom.y = geom.y + j*1000;
						var point = webMercatorUtils.webMercatorToGeographic(geom);
						this.drawSingleRect(point);
					}
				}
				this.map.addLayer(this.graphicsLayer);

				var extent = new Extent(this.xMin,this.yMin,this.xMax,this.yMax, new SpatialReference({ wkid:4326 }));
				this.map.setExtent(extent,true);
				//根据范围请求数据
				this.queryData(extent);
			},
			queryData:function(geometry){
				var queryTask = new QueryTask(ioc.map.customer);
				var query = new Query();
				query.outFields=["*"];
				query.geometry = geometry;
				query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
				var timeseg = dojo.byId("time_segment").value;
				var where = timeseg+">0";
				query.where = where;
				query.returnGeometry = true;
				queryTask.execute(query, lang.hitch(this, function (result) {
					if(result.features.length == 0)
						infoUtil.showAlert("筛选范围内没有查询到客户数据。")
					var length = result.features.length;
					var points = [];
					var maxCount = 0;
					var seg = 1;
					for(var i=0;i<length;i++){
						var count = 0;
						var attributes = result.features[i].attributes;
						switch(timeseg){
							case "T1":
								if(parseInt(attributes.T1)/seg > maxCount) maxCount = parseInt(attributes.T1)/seg;
								count = parseInt(attributes.T1);
								break;
							case "T7":
								if(parseInt(attributes.T7)/seg > maxCount) maxCount = parseInt(attributes.T7)/seg;
								count = parseInt(attributes.T7);
								break;
							case "T30":
								if(parseInt(attributes.T30)/seg > maxCount) maxCount = parseInt(attributes.T30)/seg;
								count = parseInt(attributes.T30);
								break;
							case "T60":
								if(parseInt(attributes.T60)/seg > maxCount) maxCount = parseInt(attributes.T60)/seg;
								count = parseInt(attributes.T60);
								break;
							case "T180":
								if(parseInt(attributes.T180)/seg > maxCount) maxCount = parseInt(attributes.T180)/seg;
								count = parseInt(attributes.T180);
								break;
						}

						var point = {};
						var pt = new Point(attributes.X,attributes.Y, new SpatialReference({ wkid: 102100 }));
						//pt = webMercatorUtils.webMercatorToGeographic(pt);
						pt = webMercatorUtils.geographicToWebMercator(pt);
						point["geometry"] = pt;
						point["attributes"] = {};
						point["attributes"]["count"] = count;
						points.push(point);
					}
					Global.heatMapLayer.setData(points);
				}));
			},
			myGraphicsClickHandler:function(ev){
				//console.log(ev);
				var graphics = this.graphicsLayer.graphics;
				var clickPoint = webMercatorUtils.webMercatorToGeographic(ev.mapPoint);
				var graphicsLen = graphics.length;
				//循环判断，click点在哪个范围内，并将范围输出
				for(var i=0;i<graphicsLen;i++){
					var extent = graphics[i]._extent;
					//extent = new Extent(p.xmin, p.ymin, p.xmax, p.ymax, this.map.spatialReference);
					if(extent.contains(clickPoint)){
						//console.log(graphics[i]);
						//console.log(extent);
						topic.publish("selectRect",extent);
						this.map.setExtent(extent,true);
					}
				}
			},
			//receive click rect
			handleSelectRect:function(extent){
				console.log(extent);
			},
			/**
			 * 绘制单个矩形
			 */
			drawSingleRect:function(centerPoint){
				var ringArr = [];
				// 根据一个原点画一个rect
				for(var i=0;i<=4;i++)
				{
					if(i%4==0){
						var geom = webMercatorUtils.geographicToWebMercator(centerPoint);
						var point = webMercatorUtils.webMercatorToGeographic(geom);
						ringArr.push([point.x,point.y]);
						if(this.xMin > point.x){
							this.xMin = point.x;
						}
						if(this.yMin > point.y){
							this.yMin = point.y;
						}
					}
					if(i%4==1){
						var geom = webMercatorUtils.geographicToWebMercator(centerPoint);
						geom.x = geom.x + 1000;
						var point = webMercatorUtils.webMercatorToGeographic(geom);
						ringArr.push([point.x,point.y]);
					}
					if(i%4==2){
						var geom = webMercatorUtils.geographicToWebMercator(centerPoint);
						geom.x = geom.x + 1000;
						geom.y = geom.y + 1000;
						var point = webMercatorUtils.webMercatorToGeographic(geom);
						ringArr.push([point.x,point.y]);
						if(this.xMax < point.x){
							this.xMax = point.x;
						}
						if(this.yMax < point.y){
							this.yMax = point.y;
						}
					}
					if(i%4==3){
						var geom = webMercatorUtils.geographicToWebMercator(centerPoint);
						geom.y = geom.y + 1000;
						var point = webMercatorUtils.webMercatorToGeographic(geom);
						ringArr.push([point.x,point.y]);
					}

					if((i%4==0)&&(i>0)){
						var rect = new Polygon(new SpatialReference({wkid:4326}));
						rect.addRing(ringArr);
						var rectSymbol = new SimpleFillSymbol();
						rectSymbol.setStyle(SimpleFillSymbol.STYLE_NULL);
						rectSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0,0,0]), 1)); //STYLE_LONGDASHDOT
						var attr = {"rings":ringArr};
						var infoTemplate = new InfoTemplate("Branch Information","rings: ${rings}");
						var branchSymbol = new PictureMarkerSymbol("images/marker.png",12,18);
						var drawRect = new Graphic(rect,rectSymbol,attr,infoTemplate);
						this.graphicsLayer.add(drawRect);
					}
					///rect.addRing([[this.center.x,this.center.y],[point1.x,point1.y],[point2.x,point2.y],[point3.x,point3.y],[this.center.x,this.center.y]]);
				}
			},
			clear:function () {
				if (this.graphicsLayer) {
					this.graphicsLayer.clear();
				}
			}
		});
	});