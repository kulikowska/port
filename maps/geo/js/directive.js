APP
.directive('mapWs', ['TPL', 'GEO',  function(TPL, GEO) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.mapWs,
        link: function(scope, el) {
            setTimeout( function() { GEO.init(el[0]); }, 0);
        }
    }
}])
.directive('leftWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.leftWs,
        link: function($scope, el) {
            $scope.chanSel = function(chanId) {
                console.log(chanId);
            }
        }
    }
}])
.directive('rightWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.rightWs,
        link: function($scope, el) {
            $scope.devSel = function(devId) {
                console.log(devId);
            }
        }
    }
}])
.directive('menuWs', ['TPL', 'OLCtrl', 'DATA', function(TPL, OLCtrl, DATA) {
    return {
        restrict: 'A',
        replace: true,
        template:  TPL.menuWs,
        link: function($scope, el) {
            $scope.active = '';
            $scope.point = $scope.center = $scope.elevation = $scope.box = 0;

            $scope.activate = function(ctrlName) { 
                OLCtrl.deactivate($scope.active ? $scope.active : 'elevation');
                if (ctrlName != $scope.active) {
                    $scope.active && ($scope[$scope.active] = 0);
                    $scope.active = ctrlName;
                    $scope[ctrlName] = 1;

                    var cb;
                    switch (ctrlName) {
                        case 'box' : cb = function(topLeft, bottomRight) {
                            $scope.coords.lon = topLeft.lon.toFixed(4);
                            $scope.coords.lat = topLeft.lat.toFixed(4);
                            DATA.get('WsDeviceList', function(data) {
                                $scope.devices = [];
                                for (var i=0; i<data.length; i++)
                                    $scope.devices.push( [data[i].Long4Dec, data[i].Lat4Dec, data[i].Id])
                               }
                               , topLeft, bottomRight);
                               $scope.$digest();
                            }; break;
                        case 'point' : cb = function(loc, el) {
                                   $scope.coords.lon = loc.lon.toFixed(4);
                                   $scope.coords.lat = loc.lat.toFixed(4);
                                   $scope.$digest();

                                DATA.get('WsChannelsList', function(data) {
                                    LG( data );
                                    $scope.channels = [];
                                    for (var i=0; i<data.length; i++)
                                        $scope.channels.push( [data[i].Channel] );
                               });
                           }; break;
                        case 'center' : cb = function(loc, el) {
                            LG( loc, el );
                                            $scope.coords.lon = loc.lon.toFixed(4);
                                            $scope.coords.lat = loc.lat.toFixed(4);
                                            $scope.$digest();
                                        }; break;
                        case 'elevation' : cb = function(loc, el) {
                                            $scope.coords.elevation = el.toFixed(4);
                                            $scope.coords.lon = loc.lon.toFixed(4);
                                            $scope.coords.lat = loc.lat.toFixed(4);
                                            $scope.$digest();
                                        }; break;
                    }
                    OLCtrl.activate(ctrlName, cb);

                } else { 
                    $scope[$scope.active] = 0;
                    $scope.active = '';
                }
            }
            setTimeout( function() { $scope.activate('box'); $scope.$digest(); }, 800);
        }
    }
}])
.directive('footerWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.footerWs,
        link: function(scope, el) { }
    }
}])
.directive('whitespace', ['TPL', 'GEO', function(TPL, GEO) {
    return {
        restrict: 'E',
        replace:false,
        scope: {plugData: "="},
        template: TPL.whitespace,
        link: function($scope, $element, $attributes) {
            $scope.devices = [];
            $scope.contours = [];

            $scope.coords = {};
            $scope.locAddress = function() {
                GEO.locAddress( $scope.addr, function(coords) { 
                    $scope.coords = coords;
                    LG( $scope.coords );
                    $scope.$digest();
                });
            }
        }
    }
}])
;
window.whitespacePluginLoaded = true;
