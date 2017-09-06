/**
 * Created by 80231765 on 2017/8/31.
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
        "dojo/query",
		"dijit/form/Select",
		"dijit/form/FilteringSelect",
		"dijit/form/Button",
		"dojo/store/Memory",
		"dojo/json",
		"dojo/text!./states.json",
		"dijit/_WidgetBase",
		"dijit/_TemplatedMixin",
        "dojo/text!./templates/Template.html",
		"dojo/domReady!"
    ],
    function (declare, lang, topic,domClass, domConstruct,domStyle, on, query,Select,FilteringSelect,Button,Memory, json,states,_WidgetBase,_TemplatedMixin,Template) {
        return declare([_WidgetBase,_TemplatedMixin], {
			templateString:Template,
			widgetInTemplate:true,//包含的组件在destroy中一并销毁
			container:null,
            provinceInit:"guangdong",
            cityInit:"shenzhen",
            countyInit:"baoan",
            data:null,
			provinceSelector:null,
			citySelector:null,
			countySelector:null,
            constructor:function (args) {
			    /*
                this.container = args.container;
				this.provinceInit = args.province || this.provinceInit;
				this.cityInit = args.city || this.cityInit;
				this.countyInit = args.county || this.countyInit;
                */
			    this.options={
					container:null,
					provinceInit:"guangdong",
					cityInit:"shenzhen",
					countyInit:"baoan"
                }
                lang.mixin(this.options, args);
			    this.data = args.data;
				LocationInfo = this;
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
				this.createSelector();
                this.inherited(arguments);
            },

            init:function () {
				domConstruct.place(this.domNode, this.container);
            },
            setData:function (value) {
                this.data = value;
			},
			setProvinceData:function (value) {
				LocationInfo.provinceMemory = this.setMemory(value);
				if(this.provinceSelector){
					this.provinceSelector.store =this.setMemory(value);
					this.provinceSelector.startup() ;
				}
			},
			setCityData:function (value) {
				LocationInfo.cityMemory = this.setMemory(value);
				if(this.citySelector){
					this.citySelector.store =this.setMemory(value);
					this.citySelector.startup() ;
				}
			},
			setCountyData:function (value) {
				LocationInfo.countyMemory = this.setMemory(value);
				if(this.countySelector){
					this.countySelector.store =this.setMemory(value);
					this.countySelector.startup() ;
				}
			},
			setMemory:function (data) {
				var memory = new Memory({
					idProperty: "AdminCode",
					data: data
				});
				return memory;
			},
			createProvinceSelector:function(data){
				// create FilteringSelect widget, populating its options from the store
				this.provinceSelector = new FilteringSelect({
				name: "province",
				placeHolder:this.options.provinceInit,
				style: "width: 100px;",
				store: this.setProvinceData(json.parse(data)),
				disabled:true,
				onChange: function(val){
					LocationInfo.currentState.province = LocationInfo.provinceMemory.get(val) ;

					LocationInfo.citySelector.disabled =true;
					LocationInfo.citySelector.textbox.value = "";
					LocationInfo.citySelector.startup();

					LocationInfo.countySelector.disabled =true;
					LocationInfo.countySelector.textbox.value = "";
					LocationInfo.countySelector.startup();
					topic.publish("provinceCode",LocationInfo.currentState.province.AdminCode);
				}
				}, "province");
				this.provinceSelector.startup();
			},
			createCitySelector:function(data){
				// create FilteringSelect widget, populating its options from the store
				this.citySelector = new FilteringSelect({
				name: "city",
				placeHolder:this.options.cityInit,
				style: "width: 100px;",
				store: this.setCityData(json.parse(data)),
				disabled:true,
				onChange: function(val){
					LocationInfo.currentState.city = LocationInfo.cityMemory.get(val) ;
					LocationInfo.countySelector.disabled =true;
					LocationInfo.countySelector.textbox.value = "";
					LocationInfo.countySelector.startup();
					topic.publish("cityCode",LocationInfo.currentState.city.AdminCode);
				}
				}, "city");
				//this.citySelector.store = cityData;
				this.citySelector.startup();
			},
			createCountySelector:function(data){
				// create FilteringSelect widget, populating its options from the store
				this.countySelector = new FilteringSelect({
				name: "county",
				placeHolder: this.options.countyInit,
				style: "width: 100px;",
				disabled:true,
				store: this.setCountyData(json.parse(data)),
				onChange: function(val){
					LocationInfo.currentState.county = LocationInfo.countyMemory.get(val) ;
				}
				}, "county");
				this.countySelector.startup();
			},
			createSelector:function () {
				// 用于数据返回
				LocationInfo.currentState = {
				    "province":this.options.provinceInit,
				    "city":this.options.cityInit,
				    "county":this.options.countyInit,
                }

   /*
    // create Select widget, populating its options from the store
				var provinceSelect = new Select({
					name: "province",
					store: stateStore,
					style: "width: 100px;",
					labelAttr: "name",
					maxHeight: -1, // tells _HasDropDown to fit menu within viewport
					onChange: function(value){
						console.log(value);
						//document.getElementById("value").innerHTML = value;
						//document.getElementById("displayedValue").innerHTML = this.get("displayedValue");
					}
				}, "province");
				provinceSelect.startup();
*/
				var tmp = '[{ "no": "2", "name": "testData2" },{ "no": "1", "name": "testData1" }]';
				this.createProvinceSelector(this.data.province || tmp);
				this.createCitySelector(this.data.city || tmp);
				this.createCountySelector(this.data.county || tmp);
				//lang.hitch(this,this.searchBtn)();
				this.searchBtn();
			},
			searchBtn:function () {
				var button = new Button({
					iconClass: "",//dijitIconNewTask
					showLabel: true,
					label: "Search", // analogous to title when showLabel is false
					onClick: function(){
						LocationInfo.currentState = {
							"province":LocationInfo.currentState.province,
							"city":LocationInfo.currentState.city,
							"county":LocationInfo.currentState.county,
						}
						topic.publish("locationInfo", LocationInfo.currentState);
					}
				}, "btn");
			},
            addEvents:function () {
                this.inherited(arguments);
            },
            destroy:function () {
                this.inherited(arguments);
            },
        });
    });