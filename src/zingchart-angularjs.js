(function(){
    'use strict';
    angular.module('zingchart-angularjs', [] )
    .directive('zingchart', [function(){
        return {
            restrict : 'E',
            scope : {
                zcValues : '=',
                zcJson : '=',
                zcRender : '='
            },
            controller : ['$scope', '$element', '$attrs', function($scope, $element, $attrs){

                $scope.$watch('zcValues', function(){
                    if($scope.zcValues){
                        if(isMultiArray($scope.zcValues)){
                            zingchart.exec($attrs.id, 'setseriesvalues', {
                                values : $scope.zcValues
                            });
                        }
                        else{
                            zingchart.exec($attrs.id, 'setseriesvalues', {
                                values : [$scope.zcValues]
                            });
                        }
                    }
                }, true);

                $scope.$watchCollection('zcJson', function(){
                    if($attrs.zcJson){
                        var _json = $scope.zcJson;
                        _json.type = $attrs.zcType;
                        if($scope.zcValues){
                            for(var i = 0; i < $scope.zcValues.length; i++){
                                if(_json.series[i]){
                                    _json.series[i].values = $scope.zcValues[i];
                                }
                                else{
                                    _json.series.push({'values' : $scope.zcValues[i]});
                                }
                            }
                        }
                        zingchart.exec($attrs.id, 'setdata', {
                            data : _json
                        });
                    }
                });

            }],
            link : function($scope, $element, $attrs){
                //Setup json :
                if(!$attrs.id){
                    throw new Error('ZingChart-AngularJS : Attribute ID needed');
                }

                //Defaults
                var _json = {
                    data : {
                        type : 'line',
                        series : []
                    },
                    width : 600,
                    height: 400
                };

                //Add render object.
                if($attrs.zcRender){
                    //mergeObject(JSON.parse($attrs.zcRender), _json);
                    mergeObject($attrs.zcRender, _json);
                }
                //Add other properties
                _json.data.type = ($attrs.zcType) ? $attrs.zcType : _json.data.type;
                _json.height = ($attrs.zcHeight) ? $attrs.zcHeight : _json.height;
                _json.width = ($attrs.zcWidth) ? $attrs.zcWidth : _json.width;
                _json.id = $attrs.id;


                //Add JSON object
                if($scope.zcJson){
                    mergeObject($scope.zcJson, _json.data);
                }

                //Add Values
                if($scope.zcValues){
                    if(typeof _json.data.series == 'undefined'){
                        _json.data.series = [];
                    }
                    //Single Series
                    if(!isMultiArray($scope.zcValues)){
                        if(_json.data.series[0]){
                            _json.data.series[0].values = $scope.zcValues;
                        }
                        else{
                            _json.data.series.push({'values' : $scope.zcValues})
                        }
                    }
                    //Multi Series
                    else{
                        for(var i = 0; i < $scope.zcValues.length; i++){
                            if(_json.data.series[i]){
                                _json.data.series[i].values = $scope.zcValues[i];
                            }
                            else{
                                _json.data.series.push({'values' : $scope.zcValues[i]});
                            }
                        }
                    }
                }
                zingchart.render(_json);
            }
        };
    }]);

    /**
    *   Helper function to merge an object into another, overwriting properties.
    *   A shallow, not a recursive merge
    *   @param {object} fromObj - The object that has properties to be merged
    *   @param {object} intoObj - The object being merged into (Result)
    */
    function mergeObject(fromObj, intoObj){
        for(var property in fromObj){
            intoObj[property] =fromObj[property];
        }
    }

    /**
    *   Determines whether an array is multidimensional or not.
    *   @param {array} _array - The array to test
    *   @returns {boolean} - true if the array is multidimensional, false otherwise
    */
    function isMultiArray(_array){
        if(typeof _array[0] == "string" || typeof _array[0] == "number"){
            return false;
        }
        else{
            return true;
        }
    };

})();
