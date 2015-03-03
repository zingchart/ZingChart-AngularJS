#ZingChart-AngularJS
[![Code Climate](https://codeclimate.com/github/zingchart/ZingChart-AngularJS/badges/gpa.svg)](https://codeclimate.com/github/zingchart/ZingChart-AngularJS) [![Build Status](https://travis-ci.org/zingchart/ZingChart-AngularJS.svg)](https://travis-ci.org/zingchart/ZingChart-AngularJS)
---
An AngularJS directive for ZingChart
## Install
```
bower install zingchart-angularjs
```

Inject into your app...
```
var app = angular.module('myApp', ['zingchart-angularjs']);
```

##Usage
_javascript_
```js
//In an Angular Controller
$scope.myValues = [5,6,3,2,3];
```

_markup_
```html
<zingchart id="chart-1 zc-values="myValues"></zingchart>
```

##Options
The ZingChart Component takes the following attributes:


###_zc-id_ [string] ```(required)```
The id for the DOM element for ZingChart to attach to.
#####Example:
```
<zingchart id="chart-1"></zingchart>
```

---


###_zc-values_ [array] ```(optional)```
```default : null```

Either a single-dimensional or multi-dimensional array containing the values to be charted. **Must be an Angular scope variable to bind to the directive** Overrides the series values in the zc-render and zc-data objects.

This parameter simulates the values parameter in each series object in a ZingChart json.
```js
//ZingChart json example
data:{
    series : [
        {'values' : [45,43,26]},
        {'values' : [0,1,5,3]}
    ]
}
```
The directive takes care of the work so you don't have to create this object

#####Example:
```
//.js
$scope.myData = [0,2,2,3,3,4];
$scope.myData2 = [[45,43,26],[0,1,5,3]];

//.html
<zingchart id="chart-1" zc-values="myData"></zingchart>
<zingchart id="chart-2" zc-values="myData2"></zingchart>
```

---


###_zc-json_ [object] ```(optional)```
```default : null```

A ZingChart configuration object. **Must be an Angular scope variable to bind to the directive**. This is the same object you would use to configure a chart using zingchart.render.data. It is a pseudo-parent object of zc-values. The directive performs a deep-watch on the object for any changes, and stringifys the result as JSON to be rendered to ZingChart.  More information : http://www.zingchart.com/docs/json-attributes-syntax/

#####Example:
http://jsfiddle.net/mschultz/tne7uuq0/
```
//.js
$scope.myValues = [[0,2,3,4],[9,6,4,3]];
$scope.myObj = {
  series:[
        {
            lineColor:"#900000",
            marker:{
                backgroundColor:"#dc3737",
                borderWidth:1,
                shadow:0,
                borderColor:"#f56b6b"
            }
        },
        {
            lineColor:"#efe634",
            marker:{
                backgroundColor:"#fff41f",
                borderWidth:1,
                shadow:0,
                borderColor:"#fdffc0"
            }
        },
    ]
};

//.html
<zingchart id="chart-1" zc-values="myValues" zc-json="myObj"></zingchart>
```
Note: You can add series values into this object like you normally would while using ZingChart. However if you define the directives zc-values parameter, those values will override the "values" inside of your zc-data object

---


###_zc-render_ [object] ```(optional)```
```default : null```

A ZingChart render object. This is the same object you would use to configure a chart using zingchart.render. You can change the render type, add events, and change other zingchart properties in here. Acts like a pseudo-parent of zc-values and zc-data. zc-render's properties will be overwritten if zc-values and zc-data are defined. More information : http://www.zingchart.com/docs/reference/zingchart-object/#zingchart__render

Note: This object will not be watched inside the directive. It is a one-time setup. While you can insert your data values into the render object directly, it is encouraged to use the zc-values attribute to enable dynamic updating.

#####Example:
```
//.js
$scope.myValues = [0,1,2];
$scope.myRender = {
    output :'canvas',
    events: {
        complete : function(p) {...}
    }
};

//.html
<zingchart id="chart-1" zc-render="myRender" zc-values="myValues"></zingchart>
```

---


###_zc-height_ [number] ```(optional)```
```default : 400```

Will override the height inside of a zc-render object if defined.
#####Example:
```
//.html
<zingchart id="chart-1" zc-height="500"></zingchart>
```

---


###_zc-width_ [number] ```(optional)```
```default : 600```

Will override the width inside of a zc-render object if defined.
#####Example:
```
//.html
<zingchart id="chart-1" zc-width="500"></zingchart>
```

---


###_zc-type_ [string] ```(optional)```
```default : line```

Will override the render type inside of a zc-render and zc-data object if defined.
#####Example:
```
//.html
<zingchart id="chart-1" zc-type="bar"/zingchart>
```

---
