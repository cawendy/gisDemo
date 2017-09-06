
/**
 * Created by kaer on 2017/9/2.
 */
var dojoConfig= {
    parseOnLoad: true,
    async: true,
    baseUrl: "/thirdLib/arcgis_js_api/library/3.21/3.21/dojo",
//    baseUrl:location.pathname.replace(/^\/(\w)+(.)(\w)+$/g,"") + "/thirdLib/arcgis_js_api/library/3.21/3.21/dojo",
    packages:[
        { name: "js", location: "/js" },
        { name: "thirdLib", location: "/thirdLib" },
        { name: "components", location: "/components" }
    ]
};
