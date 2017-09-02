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
			createSelector:function () {
				// create store instance referencing data from states.json
				var stateStore = new Memory({
					idProperty: "no",
					data: json.parse(states)
				});

				currentState = {
				    "province":this.options.provinceInit,
				    "city":this.options.cityInit,
				    "county":this.options.countyInit,
                }
				// create FilteringSelect widget, populating its options from the store
				var provinceSelect = new FilteringSelect({
					name: "province",
					placeHolder:this.options.provinceInit,
					style: "width: 100px;",
					store: stateStore,
					onChange: function(val){
						currentState.province = val;
					}
				}, "province");
				provinceSelect.startup();
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
				// create FilteringSelect widget, populating its options from the store
				var citySelect = new FilteringSelect({
					name: "city",
					placeHolder:this.options.cityInit,
					style: "width: 100px;",
					store: stateStore,
					onChange: function(val){
						currentState.city = val;
					}
				}, "city");
				citySelect.startup();

				var countySelect = new FilteringSelect({
					name: "county",
					placeHolder: this.options.countyInit,
					style: "width: 100px;",
					store: stateStore,
					onChange: function(val){
						currentState.county = val;
					}
				}, "county");
				countySelect.startup();

				var button = new Button({
					iconClass: "",//dijitIconNewTask
					showLabel: true,
					label: "Search", // analogous to title when showLabel is false
					onClick: function(){
						topic.publish("locationInfo", currentState);
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