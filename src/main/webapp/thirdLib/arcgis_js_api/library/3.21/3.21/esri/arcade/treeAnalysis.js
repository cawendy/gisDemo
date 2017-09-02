// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.
//>>built
define("esri/arcade/treeAnalysis",["require","exports"],function(B,r){function t(a,c,b,d){void 0!==a.fmin&&(a.min=a.fmin);void 0!==a.fmax&&(a.max=a.fmax);return"0"!==a.min&&b.length<Number(a.min)||"*"!==a.max&&b.length>Number(a.max)?-2:1}function v(a,c,b){if(null!==b.localScope&&void 0!==b.localScope[a.toLowerCase()]){var d=b.localScope[a.toLowerCase()];if("FormulaFunction"===d.type||"any"===d.type)return void 0===d.signature&&(d.signature={min:"0",max:"*"}),t(d.signature,a,c,b)}return void 0!==b.globalScope[a.toLowerCase()]&&
(d=b.globalScope[a.toLowerCase()],"FormulaFunction"===d.type||"any"===d.type)?(void 0===d.signature&&(d.signature={min:"0",max:"*"}),t(d.signature,a,c,b)):-1}function l(a,c){void 0===c&&(c=!0);var b=f(a,"SYNTAX","UNREOGNISED");try{switch(a.type){case "VariableDeclarator":return null!==a.init&&"FunctionExpression"===a.init.type?f(a,"SYNTAX","FUNCTIONVARIABLEDECLARATOR"):"Identifier"!==a.id.type?f(a,"SYNTAX","VARIABLEMUSTHAVEIDENTIFIER"):null!==a.init?l(a.init,!1):"";case "VariableDeclaration":for(var d=
0;d<a.declarations.length;d++)if(b=l(a.declarations[d],c),""!==b)return b;return"";case "ForInStatement":b=l(a.left,c);if(""!==b)break;if("VariableDeclaration"===a.left.type){if(1<a.left.declarations.length)return f(a,"SYNTAX","ONLY1VAR");if(null!==a.left.declarations[0].init)return f(a,"SYNTAX","CANNOTDECLAREVAL")}else if("Identifier"!==a.left.type)return f(a,"SYNTAX","LEFTNOTVAR");b=l(a.right,c);if(""!==b)break;b=l(a.body,c);if(""!==b)break;return"";case "ForStatement":if(null!==a.test&&(b=l(a.test,
c),""!==b))break;if(null!==a.init&&(b=l(a.init,c),""!==b))break;if(null!==a.update&&(b=l(a.update,c),""!==b))break;if(null!==a.body&&(b=l(a.body,c),""!==b))break;return"";case "ContinueStatement":return"";case "EmptyStatement":return"";case "BreakStatement":return"";case "IfStatement":b=l(a.test,c);if(""!==b)break;if(null!==a.consequent&&(b=l(a.consequent,!1),""!==b))break;if(null!==a.alternate&&(b=l(a.alternate,!1),""!==b))break;return"";case "BlockStatement":for(var e=[],d=0;d<a.body.length;d++)"EmptyStatement"!==
a.body[d].type&&e.push(a.body[d]);a.body=e;for(d=0;d<a.body.length;d++)if(b=l(a.body[d],c),""!==b)return b;return"";case "FunctionDeclaration":return!1===c?f(a,"SYNTAX","GLOBALFUNCTIONSONLY"):"Identifier"!==a.id.type?f(a,"SYNTAX","FUNCTIONMUSTHAVEIDENTIFIER"):l(a.body,!1);case "ReturnStatement":return null!==a.argument?l(a.argument,c):"";case "UpdateExpression":return"Identifier"!==a.argument.type&&"MemberExpression"!==a.argument.type?f(a,"SYNTAX","ASSIGNMENTTOVARSONLY"):l(a.argument,c);case "AssignmentExpression":if("Identifier"!==
a.left.type&&"MemberExpression"!==a.left.type)return f(a,"SYNTAX","ASSIGNMENTTOVARSONLY");b=l(a.left,c);if(""!==b)break;switch(a.operator){case "\x3d":case "/\x3d":case "*\x3d":case "%\x3d":case "+\x3d":case "-\x3d":break;default:return f(a,"SYNTAX","OPERATORNOTRECOGNISED")}return l(a.right,!1);case "ExpressionStatement":return l(a.expression,!1);case "Identifier":b="";break;case "MemberExpression":b=l(a.object,c);if(""!==b)break;return!0===a.computed?l(a.property,c):"";case "Literal":return"";case "ThisExpression":return f(a,
"SYNTAX","NOTSUPPORTED");case "CallExpression":if("Identifier"!==a.callee.type)return f(a,"SYNTAX","ONLYNODESSUPPORTED");b="";for(d=0;d<a.arguments.length;d++)if(b=l(a.arguments[d],c),""!==b)return b;return"";case "UnaryExpression":b=l(a.argument,c);break;case "BinaryExpression":b=l(a.left,c);if(""!==b)break;b=l(a.right,c);if(""!==b)break;switch(a.operator){case "\x3d\x3d":case "!\x3d":case "\x3c":case "\x3c\x3d":case "\x3e":case "\x3e\x3d":case "+":case "-":case "*":case "/":case "%":break;default:return f(a,
"SYNTAX","OPERATORNOTRECOGNISED")}return"";case "LogicalExpression":b=l(a.left,c);if(""!==b)break;b=l(a.right);if(""!==b)break;switch(a.operator){case "\x26\x26":case "||":break;default:return f(a,"SYNTAX","OPERATORNOTRECOGNISED")}return"";case "ConditionalExpression":return f(a,"SYNTAX","NOTSUPPORTED");case "ArrayExpression":b="";for(d=0;d<a.elements.length&&(b=l(a.elements[d],c),""===b);d++);break;case "Array":return f(a,"SYNTAX","NOTSUPPORTED");case "ObjectExpression":b="";for(d=0;d<a.properties.length&&
(b="",null!==a.properties[d].key&&("Literal"!==a.properties[d].key.type&&"Identifier"!==a.properties[d].key.type&&(b=f(a,"SYNTAX","OBJECTPROPERTYMUSTBESTRING")),"Literal"===a.properties[d].key.type&&(e=a.properties[d].key.value,"string"===typeof e||e instanceof String||(b=f(a,"SYNTAX","OBJECTPROPERTYMUSTBESTRING")))),""===b&&(b=l(a.properties[d],c)),""===b);d++);break;case "Property":if("Literal"!==a.key.type&&"Identifier"!==a.key.type)return f(a,"SYNTAX","ONLYLITERAL");if("Identifier"!==a.key.type&&
(b=l(a.key,c),""!==b))break;b=l(a.value,c)}return b}catch(u){throw u;}}function n(a,c){var b=f(a,"SYNTAX","UNREOGNISED"),d=null,e="";try{switch(a.type){case "VariableDeclarator":if(null!==a.init&&"FunctionExpression"===a.init.type)return f(a,"SYNTAX","FUNCTIONVARIABLEDECLARATOR");null!==c.localScope?void 0!==c.localScope[a.id.name.toLowerCase()]&&a.id.name.toLowerCase():void 0!==c.globalScope[a.id.name.toLowerCase()]&&a.id.name.toLowerCase();var l=null===a.init?"":n(a.init,c);if(""!==l)return l;null===
c.localScope?c.globalScope[a.id.name.toLowerCase()]={type:"any"}:c.localScope[a.id.name.toLowerCase()]={type:"any"};return"";case "FunctionDeclaration":d=w(a.id.name.toLowerCase(),a,c);e=y(a,c);if(""!==e)return e;if(null!==c.localScope)return f(a,"SYNTAX","GLOBALFUNCTIONSONLY");d.isnative=!1;c.globalScope[a.id.name.toLowerCase()]={type:"FormulaFunction",signature:[d]};return"";case "VariableDeclaration":for(var b="",h=0;h<a.declarations.length&&(b=n(a.declarations[h],c),""===b);h++);break;case "IfStatement":b=
n(a.test,c);if(""!==b)break;if("AssignmentExpression"===a.test.type||"UpdateExpression"===a.test.type)return f(a.test,"SYNTAX","CANNOT_USE_ASSIGNMENT_IN_CONDITION");if(null!==a.consequent&&(b=n(a.consequent,c),""!==b))break;if(null!==a.alternate&&(b=n(a.alternate,c),""!==b))break;return"";case "EmptyStatement":return"";case "BlockStatement":for(h=0;h<a.body.length;h++)if(b=n(a.body[h],c),""!==b)return b;return"";case "ReturnStatement":return null!==a.argument?n(a.argument,c):"";case "ForInStatement":if("VariableDeclaration"===
a.left.type){if(1<a.left.declarations.length)return f(a,"SYNTAX","ONLY1VAR");if(null!==a.left.declarations[0].init)return f(a,"SYNTAX","CANNOTDECLAREVAL")}else if("Identifier"!==a.left.type)return f(a,"SYNTAX","LEFTNOTVAR");b=n(a.left,c);if(""!==b)break;b=n(a.right,c);if(""!==b)break;b=n(a.body,c);if(""!==b)break;return"";case "ForStatement":if(null!==a.init&&(b=n(a.init,c),""!==b))break;if(null!==a.test&&(b=n(a.test,c),""!==b))break;if(null!==a.body&&(b=n(a.body,c),""!==b))break;if(null!==a.update&&
(b=n(a.update,c),""!==b))break;return"";case "BreakStatement":return"";case "ContinueStatement":return"";case "UpdateExpression":if("Identifier"!==a.argument.type&&"MemberExpression"!==a.argument.type)return f(a,"SYNTAX","ASSIGNMENTTOVARSONLY");var k=!1;if("MemberExpression"===a.argument.type)return n(a.argument,c);null!==c.localScope&&void 0!==c.localScope[a.argument.name.toLowerCase()]&&(k=!0);void 0!==c.globalScope[a.argument.name.toLowerCase()]&&(k=!0);return!1===k?"Identifier "+a.argument.name+
" has not been declared.":"";case "AssignmentExpression":if("Identifier"!==a.left.type&&"MemberExpression"!==a.left.type)return f(a,"SYNTAX","ASSIGNMENTTOVARSONLY");var g=n(a.right,c);if(""!==g)return g;k=!1;if("MemberExpression"===a.left.type)return g=n(a.left,c),""!==g?g:"";null!==c.localScope&&void 0!==c.localScope[a.left.name.toLowerCase()]&&(k=!0);void 0!==c.globalScope[a.left.name.toLowerCase()]&&(k=!0);return!1===k?"Identifier "+a.left.name+" has not been declared.":"";case "ExpressionStatement":return n(a.expression,
c);case "Identifier":var m=a.name.toLowerCase();if(null!==c.localScope&&void 0!==c.localScope[m])return"";b=void 0!==c.globalScope[m]?"":f(a,"SYNTAX","VARIABLENOTFOUND");break;case "MemberExpression":b=n(a.object,c);if(""!==b)break;return!0===a.computed?n(a.property,c):"";case "Literal":return"";case "ThisExpression":b=f(a,"SYNTAX","NOTSUPPORTED");break;case "CallExpression":if("Identifier"!==a.callee.type)return f(a,"SYNTAX","ONLYNODESSUPPORTED");b="";for(h=0;h<a.arguments.length;h++)if(b=n(a.arguments[h],
c),""!==b)return b;var p=v(a.callee.name,a.arguments,c);-1===p&&(b=f(a,"SYNTAX","NOTFOUND"));-2===p&&(b=f(a,"SYNTAX","WRONGSIGNATURE"));break;case "UnaryExpression":b=n(a.argument,c);break;case "BinaryExpression":b=n(a.left,c);if(""!==b)break;b=n(a.right,c);if(""!==b)break;return"";case "LogicalExpression":b=n(a.left,c);if(""!==b)break;if("AssignmentExpression"===a.left.type||"UpdateExpression"===a.left.type)return f(a.left,"SYNTAX","CANNOT_USE_ASSIGNMENT_IN_CONDITION");b=n(a.right,c);if(""!==b)break;
return"AssignmentExpression"===a.right.type||"UpdateExpression"===a.right.type?f(a.right,"SYNTAX","CANNOT_USE_ASSIGNMENT_IN_CONDITION"):"";case "ConditionalExpression":return f(a,"SYNTAX","NOTSUPPORTED");case "ArrayExpression":b="";for(h=0;h<a.elements.length&&(b=n(a.elements[h],c),""===b);h++);break;case "ObjectExpression":b="";for(h=0;h<a.properties.length;h++){b="";if(null!==a.properties[h].key&&("Literal"!==a.properties[h].key.type&&"Identifier"!==a.properties[h].key.type&&(b=f(a,"SYNTAX","OBJECTPROPERTYMUSTBESTRING")),
"Literal"===a.properties[h].key.type)){var q=a.properties[h].key.value;"string"===typeof q||q instanceof String||(b=f(a,"SYNTAX","OBJECTPROPERTYMUSTBESTRING"))}""===b&&(b=n(a.properties[h],c));if(""!==b)break}break;case "Property":if("Literal"!==a.key.type&&"Identifier"!==a.key.type)return f(a,"SYNTAX","ONLYLITERAL");if("Identifier"!==a.key.type&&(b=n(a.key,c),""!==b))break;b=n(a.value,c);break;case "Array":return f(a,"SYNTAX","NOTSUPPORTED")}return b}catch(A){throw A;}}function g(a,c){var b=!1;try{switch(a.type){case "VariableDeclarator":return null!==
a.init?g(a.init,c):b;case "FunctionDeclaration":return g(a.body,c);case "VariableDeclaration":for(var d=0;d<a.declarations.length;d++)if(g(a.declarations[d],c))return!0;return b;case "IfStatement":return g(a.test,c)||null!==a.consequent&&g(a.consequent,c)||null!==a.alternate&&g(a.alternate,c)?!0:b;case "EmptyStatement":return b;case "BlockStatement":for(d=0;d<a.body.length;d++)if(g(a.body[d],c))return!0;return b;case "ReturnStatement":return null!==a.argument?g(a.argument,c):b;case "UpdateExpression":return g(a.argument,
c);case "AssignmentExpression":return(b=g(a.right,c))?b:g(a.left,c);case "ExpressionStatement":return g(a.expression,c);case "ForInStatement":return(b=g(a.left,c))||(b=g(a.right,c))?b:b=g(a.body,c);case "ForStatement":if(null!==a.init&&(b=g(a.init,c))||null!==a.test&&(b=g(a.test,c))||null!==a.body&&(b=g(a.body,c)))return b;null!==a.update&&(b=g(a.update,c));return b;case "BreakStatement":return b;case "ContinueStatement":return b;case "Compound":return b;case "Identifier":return c.toLowerCase()===
a.name.toLowerCase();case "MemberExpression":if(b=g(a.object,c))return b;!0===a.computed&&(b=g(a.property,c));return b;case "Literal":return b;case "ThisExpression":return b;case "CallExpression":for(d=0;d<a.arguments.length;d++)g(a.arguments[d],c)&&(b=!0);return b;case "ArrayExpression":for(d=0;d<a.elements.length;d++)g(a.elements[d],c)&&(b=!0);return b;case "UnaryExpression":return g(a.argument,c);case "BinaryExpression":return(b=g(a.left,c))?b:b=g(a.right,c);case "LogicalExpression":return(b=g(a.left,
c))?b:b=g(a.right,c);case "ObjectExpression":for(d=0;d<a.properties.length;d++)g(a.properties[d],c)&&(b=!0);return b;case "Property":return b=g(a.value,c);case "ConditionalExpression":return b;case "Array":return b;default:return b}}catch(e){throw e;}}function m(a,c){var b=!1;try{switch(a.type){case "VariableDeclarator":return null!==a.init?m(a.init,c):b;case "FunctionDeclaration":return m(a.body,c);case "VariableDeclaration":for(var d=0;d<a.declarations.length;d++)if(m(a.declarations[d],c))return!0;
return b;case "IfStatement":return m(a.test,c)||null!==a.consequent&&m(a.consequent,c)||null!==a.alternate&&m(a.alternate,c)?!0:b;case "EmptyStatement":return b;case "BlockStatement":for(d=0;d<a.body.length;d++)if(m(a.body[d],c))return!0;return b;case "ReturnStatement":return null!==a.argument?m(a.argument,c):b;case "UpdateExpression":return m(a.argument,c);case "AssignmentExpression":return m(a.left,c)?!0:m(a.right,c);case "ExpressionStatement":return m(a.expression,c);case "ForInStatement":return(b=
m(a.left,c))||(b=m(a.right,c))?b:b=m(a.body,c);case "ForStatement":if(null!==a.init&&(b=m(a.init,c))||null!==a.test&&(b=m(a.test,c))||null!==a.body&&(b=m(a.body,c)))return b;null!==a.update&&(b=m(a.update,c));return b;case "BreakStatement":return b;case "ContinueStatement":return b;case "Compound":return b;case "Identifier":return b;case "MemberExpression":if(b=m(a.object,c))return b;!0===a.computed&&(b=m(a.property,c));return b;case "Literal":return b;case "ThisExpression":return b;case "CallExpression":if(a.callee.name.toLowerCase()===
c.toLowerCase())return!0;for(d=0;d<a.arguments.length;d++)m(a.arguments[d],c)&&(b=!0);return b;case "ArrayExpression":for(d=0;d<a.elements.length;d++)m(a.elements[d],c)&&(b=!0);return b;case "UnaryExpression":return m(a.argument,c);case "BinaryExpression":return(b=m(a.left,c))?b:b=m(a.right,c);case "LogicalExpression":return(b=m(a.left,c))?b:b=m(a.right,c);case "ConditionalExpression":return b;case "ObjectExpression":for(d=0;d<a.properties.length;d++)m(a.properties[d],c)&&(b=!0);return b;case "Property":return b=
m(a.value,c);case "Array":return b;default:return b}}catch(e){throw e;}}function p(a,c){var b=[],d;try{switch(a.type){case "VariableDeclarator":return null!==a.init?p(a.init,c):b;case "FunctionDeclaration":return p(a.body,c);case "VariableDeclaration":for(var e=0;e<a.declarations.length;e++)d=p(a.declarations[e],c),b=b.concat(d);return b;case "ForInStatement":return d=p(a.left,c),b=b.concat(d),d=p(a.right,c),b=b.concat(d),d=p(a.body,c),b=b.concat(d);case "ForStatement":return null!==a.init&&(d=p(a.init,
c),b=b.concat(d)),null!==a.test&&(d=p(a.test,c),b=b.concat(d)),null!==a.body&&(d=p(a.body,c),b=b.concat(d)),null!==a.update&&(d=p(a.update,c),b=b.concat(d)),b;case "IfStatement":return d=p(a.test,c),b=b.concat(d),null!==a.consequent&&(d=p(a.consequent,c),b=b.concat(d)),null!==a.alternate&&(d=p(a.alternate,c),b=b.concat(d)),b;case "EmptyStatement":return b;case "BlockStatement":for(e=0;e<a.body.length;e++)d=p(a.body[e],c),b=b.concat(d);return b;case "ReturnStatement":return null!==a.argument?p(a.argument,
c):b;case "UpdateExpression":return p(a.argument,c);case "AssignmentExpression":return b=p(a.left,c),b=b.concat(p(a.right,c));case "ExpressionStatement":return p(a.expression,c);case "BreakStatement":return b;case "ContinueStatement":return b;case "Compound":return b;case "Identifier":return b;case "MemberExpression":if("Identifier"!==a.object.type)return b;if(!1===a.computed)b.push(a.object.name.toLowerCase()+"."+a.property.name.toLowerCase());else try{"Literal"===a.property.type&&"string"===typeof a.property.value&&
b.push(a.object.name.toLowerCase()+"."+a.property.value.toString().toLowerCase())}catch(u){}return b;case "Literal":return b;case "ThisExpression":return b;case "CallExpression":for(e=0;e<a.arguments.length;e++)d=p(a.arguments[e],c),b=b.concat(d);return b;case "ArrayExpression":for(e=0;e<a.elements.length;e++)d=p(a.elements[e],c),b=b.concat(d);return b;case "UnaryExpression":return p(a.argument,c);case "ObjectExpression":for(e=0;e<a.properties.length;e++)d=p(a.properties[e],c),b=b.concat(d);return b;
case "Property":return p(a.value,c);case "BinaryExpression":return d=p(a.left,c),b=b.concat(d),d=p(a.right,c),b=b.concat(d);case "LogicalExpression":return d=p(a.left,c),b=b.concat(d),d=p(a.right,c),b=b.concat(d);case "ConditionalExpression":return b;case "Array":return b;default:return b}}catch(u){throw u;}}function w(a,c,b){b=[];if(void 0!==c.params&&null!==c.params)for(var d=0;d<c.params.length;d++)b.push("any");return{name:a,"return":"any",params:b}}function y(a,c){for(var b={globalScope:c.globalScope,
localScope:{}},d=0;d<a.params.length;d++)b.localScope[a.params[d].name.toLowerCase()]={type:"any"};return n(a.body,b)}function x(a,c,b,d){var e={};if(void 0===a||null===a)a={};if(void 0===b||null===b)b={};e.infinity={type:"any"};e.textformatting={type:"any"};e.pi={type:"any"};for(var f in c)if("simple"!==d||"simple"===d&&"a"===c[f].av)e[f]={type:"FormulaFunction",signature:c[f]};for(c=0;c<b.length;c++)f=b[c],e[f.name]={type:"FormulaFunction",signature:f};for(f in a)e[f]=a[f],e[f].type="any";return e}
function f(a,c,b){var d="";switch(c){case "SYNTAX":d="Syntax Error: ";break;case "RUNTIME":d="Runtime Error: ";break;default:d="Syntax Error: "}try{switch(a.type){case "IfStatement":switch(b){case "CANNOT_USE_ASSIGNMENT_IN_CONDITION":d+=" Assignments not be made in logical tests";break;case "CANNOT_USE_NONBOOLEAN_IN_CONDITION":d+=" Non Boolean used as Condition"}break;case "UpdateExpression":case "AssignmentExpression":switch(b){case "CANNOT_USE_ASSIGNMENT_IN_CONDITION":d+=" Assignments not be made in logical tests";
break;case "ASSIGNMENTTOVARSONLY":d+=" Assignments can only be made to identifiers"}break;case "ExpressionStatement":d+=" Assignments can only be made to identifiers";break;case "FunctionDeclaration":switch(b){case "GLOBALFUNCTIONSONLY":d+=" Functions cannot be declared as variables";break;case "FUNCTIONMUSTHAVEIDENTIFIER":d+=" Function Definition must have an identifier"}break;case "VariableDeclaration":d+=" Only 1 variable can be declared at a time";break;case "VariableDeclarator":switch(b){case "FUNCTIONVARIABLEDECLARATOR":d+=
" Functions cannot be declared as variables";break;case "VARIABLEMUSTHAVEIDENTIFIER":d+=" Variable Definition must have an identifier"}break;case "Identifier":d+=" Identifier Not Found. ";d+=a.name;break;case "ObjectExpression":switch(b){case "OBJECTPROPERTYMUSTBESTRING":d+=" Property name must be a string"}break;case "ForStatement":switch(b){case "CANNOT_USE_NONBOOLEAN_IN_CONDITION":d+=" Non Boolean used as Condition"}break;case "ForInStatement":switch(b){case "ONLY1VAR":d+=" Can only declare 1 var for use with IN";
break;case "CANNOTDECLAREVAL":d+=" Can only declare value for use with IN";break;case "LEFTNOVAR":d+="Must provide a variable to iterate with.";break;case "VARIABLENOTDECLARED":d+="Variable must be declared before it is used..";break;case "CANNOTITERATETHISTYPE":d+="This type cannot be used in an IN loop"}break;case "MemberExpression":switch(b){case "PROPERTYNOTFOUND":d+="Cannot find member property. ";d+=!1===a.computed?a.property.name:"";break;case "OUTOFBOUNDS":d+="Out of Bounds. ";d+=!1===a.computed?
a.property.name:"";break;case "NOTFOUND":d+="Cannot call member method on null. ";d+=!1===a.computed?a.property.name:"";break;case "INVALIDTYPE":d+="Cannot call member property on object of this type. ",d+=!1===a.computed?a.property.name:""}break;case "Property":switch(b){case "ONLYLITERAL":d+="Property names must be literals or identifiers"}break;case "Literal":break;case "ThisExpression":d+="THIS construct is not supported.";case "CallExpression":switch(b){case "WRONGSIGNATURE":d+="Function signature does not match: ";
d+=a.callee.name;break;case "ONLYNODESUPPORTED":d+="Functions must be declared.";d+=a.callee.name;break;case "NOTAFUNCTION":d+="Not a Function: ";d+=a.callee.name;break;case "NOTFOUND":d+="Function Not Found: "+a.callee.name}break;case "UnaryExpression":switch(b){case "NOTSUPPORTEDUNARYOPERATOR":d+="Operator "+a.operator+" not allowed in this context. Only ! can be used with boolean, and - with a number";break;case "NOTSUPPORTEDTYPE":d+="Unary operator "+a.operator+" cannot be used with this argument."}case "BinaryExpression":switch(b){case "OPERATORNOTRECOGNISED":d+=
"Binary Operator not recognised "+a.operator}break;case "LogicalExpression":switch(b){case "ONLYBOOLEAN":d+="Operator "+a.operator+" cannot be used. Only || or \x26\x26 are allowed values";break;case "ONLYORORAND":d+="Logical Expression "+a.operator+" being applied to parameters that are not boolean."}case "ConditionalExpression":d+="Conditional statements not supported.";break;case "ArrayExpression":switch(b){case "FUNCTIONCONTEXTILLEGAL":d+=" Cannot Put Function inside Array."}break;case "Array":d+=
"Expression contains unrecognised array structure.";break;default:d+="Expression contains unrecognised code structures."}}catch(e){throw e;}return d}function q(a,c,b){return{line:a.loc.start.line,character:a.loc.start.column,reason:f(a,c,b)}}function z(a,c,b,d,e){void 0===e&&(e=!0);c={globalScope:c.globalScope,localScope:{}};for(e=0;e<a.params.length;e++)c.localScope[a.params[e].name.toLowerCase()]={type:"any"};k(a.body,c,b,d,!1)}function k(a,c,b,d,e){void 0===e&&(e=!0);if(null===a)throw Error("Unnexpexted Expression Syntax");
f(a,"SYNTAX","UNREOGNISED");var g=null;try{switch(a.type){case "VariableDeclarator":if(null!==a.init&&"FunctionExpression"===a.init.type){d.push(q(a,"SYNTAX","FUNCTIONVARIABLEDECLARATOR"));break}"Identifier"!==a.id.type?d.push(q(a,"SYNTAX","VARIABLEMUSTHAVEIDENTIFIER")):(null!==c.localScope?void 0!==c.localScope[a.id.name.toLowerCase()]&&a.id.name.toLowerCase():void 0!==c.globalScope[a.id.name.toLowerCase()]&&a.id.name.toLowerCase(),null===c.localScope?c.globalScope[a.id.name.toLowerCase()]={type:"any"}:
c.localScope[a.id.name.toLowerCase()]={type:"any"});null===a.init?"":k(a.init,c,b,d,e);break;case "FunctionDeclaration":!1===e&&d.push(q(a,"SYNTAX","GLOBALFUNCTIONSONLY"));"Identifier"!==a.id.type&&d.push(q(a,"SYNTAX","FUNCTIONMUSTHAVEIDENTIFIER"));g=w("",a,c);z(a,c,b,d,e);null!==c.localScope&&d.push(q(a,"SYNTAX","GLOBALFUNCTIONSONLY"));g.isnative=!1;"Identifier"===a.id.type&&(c.globalScope[a.id.name.toLowerCase()]={type:"FormulaFunction",signature:[g]});break;case "VariableDeclaration":for(var h=
0;h<a.declarations.length;h++)k(a.declarations[h],c,b,d,e);break;case "IfStatement":null!==a.test&&(k(a.test,c,b,d,e),"AssignmentExpression"!==a.test.type&&"UpdateExpression"!==a.test.type||d.push(q(a.test,"SYNTAX","CANNOT_USE_ASSIGNMENT_IN_CONDITION")));null!==a.consequent&&k(a.consequent,c,b,d,e);null!==a.alternate&&k(a.alternate,c,b,d,e);break;case "EmptyStatement":break;case "BlockStatement":if(null!==a.body)for(h=0;h<a.body.length;h++)k(a.body[h],c,b,d,e);break;case "ReturnStatement":null!==
a.argument&&k(a.argument,c,b,d,e);break;case "ForInStatement":"VariableDeclaration"===a.left.type?(1<a.left.declarations.length&&d.push(q(a,"SYNTAX","ONLY1VAR")),null!==a.left.declarations[0].init&&d.push(q(a,"SYNTAX","CANNOTDECLAREVAL"))):"Identifier"!==a.left.type&&d.push(q(a,"SYNTAX","LEFTNOTVAR"));k(a.left,c,b,d,e);k(a.right,c,b,d,e);k(a.body,c,b,d,e);break;case "ForStatement":null!==a.init&&k(a.init,c,b,d,e);null!==a.test&&k(a.test,c,b,d,e);null!==a.body&&k(a.body,c,b,d,e);null!==a.update&&k(a.update,
c,b,d,e);break;case "BreakStatement":break;case "ContinueStatement":break;case "UpdateExpression":"Identifier"!==a.argument.type&&"MemberExpression"!==a.argument.type?d.push(q(a,"SYNTAX","ASSIGNMENTTOVARSONLY")):("Identifier"===a.argument.type&&(g=!1,!1===b&&(null!==c.localScope&&void 0!==c.localScope[a.argument.name.toLowerCase()]&&(g=!0),void 0!==c.globalScope[a.argument.name.toLowerCase()]&&(g=!0),!1===g&&d.push({line:null===a?0:a.loc.start.line,character:null===a?0:a.loc.start.column,reason:"Identifier "+
a.argument.name+" has not been declared."}))),"MemberExpression"===a.argument.type&&k(a.argument,c,b,d,e));break;case "AssignmentExpression":"Identifier"!==a.left.type&&"MemberExpression"!==a.left.type&&d.push(q(a,"SYNTAX","ASSIGNMENTTOVARSONLY"));switch(a.operator){case "\x3d":case "/\x3d":case "*\x3d":case "%\x3d":case "+\x3d":case "-\x3d":break;default:d.push(q(a,"SYNTAX","OPERATORNOTRECOGNISED"))}k(a.right,c,b,d,e);g=!1;"Identifier"===a.left.type&&(null!==c.localScope&&void 0!==c.localScope[a.left.name.toLowerCase()]&&
(g=!0),void 0!==c.globalScope[a.left.name.toLowerCase()]&&(g=!0),!1===b&&!1===g&&d.push({line:null===a?0:a.loc.start.line,character:null===a?0:a.loc.start.column,reason:"Identifier "+a.argument.name+" has not been declared."}));"MemberExpression"===a.left.type&&k(a.left,c,b,d,e);break;case "ExpressionStatement":k(a.expression,c,b,d,e);break;case "Identifier":var l=a.name.toLowerCase();if(null!==c.localScope&&void 0!==c.localScope[l])break;void 0===c.globalScope[l]&&!1===b&&d.push(q(a,"SYNTAX","VARIABLENOTFOUND"));
break;case "MemberExpression":k(a.object,c,b,d,e);!0===a.computed&&k(a.property,c,b,d,e);break;case "Literal":return"";case "ThisExpression":d.push(q(a,"SYNTAX","NOTSUPPORTED"));break;case "CallExpression":"Identifier"!==a.callee.type&&d.push(q(a,"SYNTAX","ONLYNODESSUPPORTED"));for(h=0;h<a.arguments.length;h++)k(a.arguments[h],c,b,d,e);var m=v(a.callee.name,a.arguments,c);!1===b&&-1===m&&d.push(q(a,"SYNTAX","NOTFOUND"));-2===m&&d.push(q(a,"SYNTAX","WRONGSIGNATURE"));break;case "UnaryExpression":k(a.argument,
c,b,d,e);break;case "BinaryExpression":k(a.left,c,b,d,e);k(a.right,c,b,d,e);switch(a.operator){case "\x3d\x3d":case "!\x3d":case "\x3c":case "\x3c\x3d":case "\x3e":case "\x3e\x3d":case "+":case "-":case "*":case "/":case "%":break;default:d.push(q(a,"SYNTAX","OPERATORNOTRECOGNISED"))}break;case "LogicalExpression":switch(a.operator){case "\x26\x26":case "||":break;default:d.push(q(a,"SYNTAX","OPERATORNOTRECOGNISED"))}k(a.left,c,b,d,e);"AssignmentExpression"!==a.left.type&&"UpdateExpression"!==a.left.type||
d.push(q(a,"SYNTAX","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));k(a.right,c,b,d,e);"AssignmentExpression"!==a.right.type&&"UpdateExpression"!==a.right.type||d.push(q(a,"SYNTAX","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));break;case "ConditionalExpression":d.push(q(a,"SYNTAX","NOTSUPPORTED"));break;case "ArrayExpression":for(h=0;h<a.elements.length;h++)k(a.elements[h],c,b,d,e);break;case "Array":d.push(q(a,"SYNTAX","NOTSUPPORTED"));case "ObjectExpression":for(h=0;h<a.properties.length;h++)k(a.properties[h],
c,b,d,e);break;case "Property":"Literal"!==a.key.type&&"Identifier"!==a.key.type&&d.push(q(a,"SYNTAX","ONLYLITERAL"));"Literal"===a.key.type&&k(a.key,c,b,d,e);k(a.value,c,b,d,e);break;default:d.push(q(a,"SYNTAX","UNRECOGNISED"))}}catch(C){d.push({line:null===a?0:a.loc.start.line,character:null===a?0:a.loc.start.column,reason:"Unnexpected Syntax"})}}Object.defineProperty(r,"__esModule",{value:!0});r.functionDecls={concatenate:{min:"0",max:"*",av:"a"},split:{min:"2",max:"4",av:"a"},guid:{min:"0",max:"1",
av:"a"},today:{min:"0",max:"0",av:"a"},now:{min:"0",max:"0",av:"a"},timestamp:{min:"0",max:"0",av:"a"},day:{min:"1",max:"1",av:"a"},month:{min:"1",max:"1",av:"a"},year:{min:"1",max:"1",av:"a"},hour:{min:"1",max:"1",av:"a"},second:{min:"1",max:"1",av:"a"},millisecond:{min:"1",max:"1",av:"a"},minute:{min:"1",max:"1",av:"a"},weekday:{min:"1",max:"1",av:"a"},toutc:{min:"1",max:"1",av:"a"},tolocal:{min:"1",max:"1",av:"a"},date:{min:"0",max:"7",av:"a"},datediff:{min:"2",max:"3",av:"a"},dateadd:{min:"2",
max:"3",av:"a"},trim:{min:"1",max:"1",av:"a"},text:{min:"1",max:"2",av:"a"},left:{min:"2",max:"2",av:"a"},right:{min:"2",max:"2",av:"a"},mid:{min:"2",max:"3",av:"a"},upper:{min:"1",max:"1",av:"a"},proper:{min:"1",max:"2",av:"a"},lower:{min:"1",max:"1",av:"a"},find:{min:"2",max:"3",av:"a"},iif:{min:"3",max:"3",av:"a"},decode:{min:"2",max:"*",av:"a"},when:{min:"2",max:"*",av:"a"},defaultvalue:{min:"2",max:"2",av:"a"},isempty:{min:"1",max:"1",av:"a"},maplayer:{min:"2",max:"3",av:"f"},domaincode:{min:"3",
max:"4",av:"a"},domainname:{min:"2",max:"4",av:"a"},polygon:{min:"1",max:"1",av:"a"},point:{min:"1",max:"1",av:"a"},polyline:{min:"1",max:"1",av:"a"},extent:{min:"1",max:"1",av:"a"},multipoint:{min:"1",max:"1",av:"a"},geometry:{min:"1",max:"1",av:"a"},featurelayer:{min:"1",max:"3",av:"f"},featurecollection:{min:"1",max:"1",av:"f"},buffer:{min:"2",max:"4",av:"f"},area:{min:"1",max:"2",av:"f"},sumarea:{min:"1",max:"2",av:"f"},length:{min:"1",max:"2",av:"f"},sumlength:{min:"1",max:"2",av:"f"},count:{min:"0",
max:"*",av:"a"},filter:{min:"2",max:"2",av:"f"},envelopeintersects:{min:"2",max:"2",av:"f"},intersects:{min:"2",max:"2",av:"f"},contains:{min:"2",max:"2",av:"f"},overlaps:{min:"2",max:"2",av:"f"},within:{min:"2",max:"2",av:"f"},touches:{min:"2",max:"2",av:"f"},crosses:{min:"2",max:"2",av:"f"},union:{min:"1",max:"2",av:"f",fmin:1},difference:{min:"2",max:"2",av:"f",fmin:2,fmax:3},intersection:{min:"2",max:"2",av:"f",fmin:2,fmax:3},symmetricdifference:{min:"2",max:"2",av:"f",fmin:2,fmax:3},number:{min:"1",
max:"2",av:"a"},acos:{min:"1",max:"1",av:"a"},asin:{min:"1",max:"1",av:"a"},atan:{min:"1",max:"1",av:"a"},atan2:{min:"2",max:"2",av:"a"},ceil:{min:"1",max:"2",av:"a"},floor:{min:"1",max:"2",av:"a"},round:{min:"1",max:"2",av:"a"},cos:{min:"1",max:"1",av:"a"},exp:{min:"1",max:"1",av:"a"},log:{min:"1",max:"1",av:"a"},min:{min:"0",max:"*",av:"a"},console:{min:"0",max:"*",av:"a"},max:{min:"0",max:"*",av:"a"},pow:{min:"2",max:"2",av:"a"},random:{min:"0",max:"0",av:"a"},sqrt:{min:"1",max:"1",av:"a"},sin:{min:"1",
max:"1",av:"a"},tan:{min:"1",max:"1",av:"a"},abs:{min:"1",max:"1",av:"a"},isnan:{min:"1",max:"1",av:"a"},stdev:{min:"0",max:"*",av:"a"},average:{min:"0",max:"*",av:"a"},mean:{min:"0",max:"*",av:"a"},sum:{min:"0",max:"*",av:"a"},variance:{min:"0",max:"*",av:"a"},distinct:{min:"0",max:"*",av:"a"},addfield:{min:"3",max:"3",av:"f"},removefield:{min:"2",max:"2",av:"f"},aggregate:{min:"3",max:"3",av:"f"},dissolve:{min:"2",max:"3",av:"f"},changeshape:{min:"2",max:"4",av:"f"},first:{min:"1",max:"1",av:"a"},
top:{min:"2",max:"2",av:"a"},orderby:{min:"2",max:"2",av:"f"},"boolean":{min:"1",max:"1",av:"a"},dictionary:{min:"0",max:"*",av:"a"},servicearea:{min:"2",max:"*",av:"f"},equals:{min:"2",max:"2",av:"a"},"typeof":{min:"1",max:"1",av:"a"},reverse:{min:"1",max:"1",av:"a"},replace:{min:"3",max:"4",av:"a"},sort:{min:"1",max:"2",av:"a"},feature:{min:"1",max:"*",av:"a"},haskey:{min:"2",max:"2",av:"a"},indexof:{min:"2",max:"2",av:"a"},centroid:{min:"1",max:"1",av:"f"},multiparttosinglepart:{min:"1",max:"1",
av:"f"}};r.checkFunctionSignature=t;r.findFunction=v;r.validateLanguageNode=l;r.testValidityOfExpression=n;r.referencesMemberImpl=g;r.referencesMember=function(a,c){return!0===g(a.body[0].body,c.toLowerCase())?!0:!1};r.referencesFunctionImpl=m;r.referencesFunction=function(a,c){return!0===m(a.body[0].body,c)?!0:!1};r.findFieldLiteralsImpl=p;r.findFieldLiterals=function(a,c){return p(a.body[0].body,c)};r.extractFunctionDeclaration=w;r.validateFunction=y;r.constructGlobalScope=x;r.validateScript=function(a,
c,b){void 0===b&&(b="full");c={globalScope:x(c.vars,r.functionDecls,c.customFunctions,b),localScope:null};return n(a.body[0].body,c)};r.validateLanguage=function(a){return"BlockStatement"!==a.body[0].body.type?"Invalid formula content.":l(a.body[0].body)};r.nodeErrorMessage=f;r.makeError=q;r.extractAllIssuesInFunction=z;r.extractAllIssues=k;r.checkScript=function(a,c,b,d){void 0===d&&(d="full");var e=[];if("BlockStatement"!==a.body[0].body.type)return[{line:0,character:0,reason:"Invalid Body"}];if(null===
c||void 0===c)c={vars:{},customFunctions:[]};c={globalScope:x(c.vars,r.functionDecls,c.customFunctions,d),localScope:null};try{k(a.body[0].body,c,b,e)}catch(u){}return e}});