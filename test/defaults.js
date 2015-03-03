describe('ZingChart Directive', function(){

    beforeEach(module('zingchart-angularjs'));

    var _$scope;
    var _$compile;

    beforeEach(function(done){
        inject(function ($compile, $rootScope) {
            _$scope = $rootScope.$new();
            _$compile = $compile;
            var completed = 0;
            $('<div id="container"></div>').appendTo('body');

            //Cases 1+2

            $('<zingchart id="chart-1"></zingchart>').appendTo("#container");

            //Case 3
            _$scope.myValues2 = [[3,2,3,3,9] , [1,2,3,4,5]];
            $('<zingchart id="chart-2" zc-values="myValues2"></zingchart>').appendTo("#container");

            //Case 4
            _$scope.myValues3 = [1,2,3,4,5];
            $('<zingchart id="chart-3" zc-values="myValues3"></zingchart>').appendTo("#container");

            //Case 5
            _$scope.myValues4 = [1,2,3,4,5];
            _$scope.myJson4 = {
                    "series":[
                        {
                            "line-color":"#ff653f",
                            "marker":{
                                "background-color":"#900000",
                                "border-width":1,
                                "shadow":0,
                                "border-color":"#f56b6b"
                            }
                        }
                    ]
            };
            $('<zingchart id="chart-4" zc-values="myValues4" zc-json="myJson4"></zingchart>').appendTo("#container");

            //Case 6
            _$scope.myValues5 = [5,5,6,7,10];
            _$scope.myJson5 = {
                    "series":[
                        {
                            "line-color":"#007790",
                            "marker":{
                                "background-color":"#007790",
                                "border-width":1,
                                "shadow":0,
                                "border-color":"#69dbf1"
                            },
                            "values": [0,0,0,2,3]
                        },
                        {
                            "line-color":"#007790",
                            "marker":{
                                "background-color":"#007790",
                                "border-width":1,
                                "shadow":0,
                                "border-color":"#69dbf1"
                            },
                            "values" : [1,2,3,4,5]
                        }
                    ]
            };
            $('<zingchart id="chart-5" zc-values="myValues5" zc-json="myJson5"></zingchart>').appendTo("#container");

            //Case 7
            _$scope.myValues6 = [[10,20,30,44,99],[20,30,50,20,50]];
            _$scope.myJson6 = {
                    "series":[
                        {
                            "line-color":"#33d911",
                            "marker":{
                                "background-color":"#90e496",
                                "border-width":1,
                                "shadow":0,
                                "border-color":"#6bf56e"
                            },
                            "values": [0,0,0,2,3]
                        },
                        {
                            "line-color":"#90005b",
                            "marker":{
                                "background-color":"#8b0090",
                                "border-width":1,
                                "shadow":0,
                                "border-color":"#d6aee7"
                            },
                            "values" : [1,2,3,4,5]
                        }
                    ]
            };
            _$scope.myRender6 = {
                "output" : "canvas",
                "data" : {
                    "series" : [{
                        "values" : [1,1,1]
                    }]
                }
            };
            $('<zingchart id="chart-6" zc-values="myValues6" zc-json="myJson6" zc-render="myRender6"></zingchart>').appendTo("#container");

            //Case 8
            _$scope.myValues7 = [[3,2,3,3,9] , [1,2,3,4,5]];
            $('<zingchart id="chart-7" zc-values="myValues7" zc-type="bar"></zingchart>').appendTo("#container");

            //Case 9
            _$scope.myValues8 = [3,2,3,3,9];
            _$scope.myJson8 = {
                    "type": "bar"
            };
            $('<zingchart id="chart-8" zc-values="myValues8" zc-json="myJson8" zc-type="line"></zingchart>').appendTo("#container");


            var $element = _$compile(document.getElementById('container'))(_$scope);

            zingchart.complete=function(p){
                completed++;
                if(completed == 8){
                    done();
                }
            }
        });
    });
    //Case 1
    it("should create chart-1 : render an empty zingchart", function(){
        var output = zingchart.exec('chart-1', 'getdata');
        var expected = {
            "graphset": [{
                "type":"line",
                "series":[]
            }]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));

    });

    //Case 2
    it("should render chart-1 with default width and height", function(){
        var output = zingchart.exec('chart-1', 'getobjectinfo', {
            object : 'graph'
        });
        expect(output.width).to.equal(600);
        expect(output.height).to.equal(400);
    });

    //Case 3
    it("should render chart-2, a line chart with 2 series", function(){
        var output = zingchart.exec('chart-2', 'getdata');
        var expected = {
            "graphset": [{
                "type":"line",
                "series":[
                    {"values" : [3,2,3,3,9]},
                    {"values" : [1,2,3,4,5]},
                ]
            }]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));
    });

    //Case 4
    it("should render chart-3; a line chart with 1 series", function(){
        var output = zingchart.exec('chart-3', 'getdata');
        var expected = {
            "graphset": [{
                "type":"line",
                "series":[
                    {"values" : [1,2,3,4,5]},
                ]
            }]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));
    });

    //Case 5
    it("should render chart-4; a line chart with 1 series, and a data object", function(){
        var output = zingchart.exec('chart-4', 'getdata');
        var expected = {
            "graphset":[{
                "type":"line",
                "series":[{
                    "line-color":"#ff653f",
                    "marker":{
                        "background-color":"#900000",
                        "border-width":1,
                        "shadow":0,
                        "border-color":"#f56b6b"
                    },
                "values":[1,2,3,4,5]}
                ]}
            ]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));
    });

    //Case 6
    it("should render chart-5; a line chart with 1 series, and a data object with 2 series", function(){
        var output = zingchart.exec('chart-5', 'getdata');
        var expected = {
            "graphset":[{
                "type":"line",
                "series":[
                    {
                        "line-color":"#007790",
                        "marker":{
                            "background-color":"#007790",
                            "border-width":1,
                            "shadow":0,
                            "border-color":"#69dbf1"
                        },
                        "values":[5,5,6,7,10]
                    },
                    {
                        "line-color":"#007790",
                        "marker":{
                            "background-color":"#007790",
                            "border-width":1,
                            "shadow":0,
                            "border-color":"#69dbf1"
                        },
                        "values":[1,2,3,4,5]
                    }
                ]}
            ]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));
    });

    //Case 7
    it("should render chart-6; a line chart with 2 series, and a data object with 2 series, and a render object with 1 series in canvas", function(){
        var output = zingchart.exec('chart-6', 'getdata');
        var expected = {
            "graphset": [{
                "series": [{
                    "line-color": "#33d911",
                    "marker": {
                        "background-color": "#90e496",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#6bf56e"
                    },
                    "values": [10, 20, 30, 44, 99]
                }, {
                    "line-color": "#90005b",
                    "marker": {
                        "background-color": "#8b0090",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#d6aee7"
                    },
                    "values": [20, 30, 50, 20, 50]
                }]
            }]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));
    });

    //Case 8
    it("should render chart-7 a 1 series bar chart", function(){
        var output = zingchart.exec('chart-7', 'getdata');
        var expected = {
            "graphset": [{
                "type": "bar",
                "series": [{
                    "values": [3, 2, 3, 3, 9]
                }, {
                    "values": [1, 2, 3, 4, 5]
                }]
            }]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));
    });

    //Case 9
    it("should render chart-8; a line chart with a json that specifies bar, but is overwritten", function(){
        var output = zingchart.exec('chart-8', 'getdata');
        var expected = {
            "graphset":[{
                "type":"line",
                "series":[{
                    "values":[3,2,3,3,9]
                }]
            }]
        };
        expect(JSON.stringify(output)).to.equal(JSON.stringify(expected));
    });
});
