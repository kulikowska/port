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
.directive('leftWs', ['TPL', 'GEO', 'DATA', function(TPL, GEO, DATA) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.leftWs,
        scope:true,
        link: function($scope, el) {
            $scope.chanVis = {};
            $scope.vis = [true, true, true];
            $scope.chanSel = function(chanId) {
                if ( $scope.active == chanId ) $scope.active = -1;
                else $scope.active = chanId;

                $scope.selChan = DATA.findChan(chanId);
                LG( DATA.chanLoc(chanId) , ' dev c' );
                $scope.chanDevs = DATA.chanLoc(chanId);
                GEO.chanVis(chanId, $scope.chanDevs, $scope.active == chanId, 1, function(data) {
                });
            };
            $scope.range = function(idx) { GEO.range(idx, $scope.vis[idx]); };
        }
    }
}])
.directive('rightWs', ['TPL', 'GEO', 'DATA', function(TPL, GEO, DATA) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.rightWs,
        scope:true,
        link: function($scope, el) {
            var active = 0;
            $scope.vis = {}; 
            $scope.devSel = function(devId) {
                $scope.selDevice = DATA.findDev(devId);
                active != devId && ($scope.vis[active] -= 1);
                typeof $scope.vis[devId] == 'undefined' && ($scope.vis[devId] = 0); 
                ($scope.vis[devId] -= 1) < 0 && ($scope.vis[devId] = 2);
                GEO.deviceVis(DATA.findDev(devId)._ID, $scope.vis[devId], active, 
                    function(v) { 
                        LG(v, 'v ', DATA.findDev(devId) );
                    }
                );
                active = devId;
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
            $scope.autoOff = false;
            $scope.point = $scope.center = $scope.elevation = $scope.box = 0;

            var setActive = function(ctrlName){
                if ($scope.autoOff) {
                    OLCtrl.deactivate($scope.active);
                    $scope[ctrlName] = 0;
                    $scope.active = '';
                }
                $scope.$digest();
            };

            $scope.activate = function(ctrlName) { 
                OLCtrl.deactivate($scope.active ? $scope.active : 'elevation');
                if (ctrlName != $scope.active) {
                    $scope.active && ($scope[$scope.active] = 0);
                    $scope.active = ctrlName;
                    $scope[ctrlName] = 1;

                    var cb;
                    switch (ctrlName) {
                        case 'box' : cb = function(tL, bR) {
                                $scope.coords.lon = tL.lon.toFixed(4);
                                $scope.coords.lat = tL.lat.toFixed(4);
                                setActive(ctrlName);

                                DATA.get('WsDeviceList',function(data) {
                                    $scope.devices=data;
                                    DATA.get('WsDeviceDetails',function(data) {});
                                },tL,bR);

                            }; break;
                        case 'point' : cb = function(loc, el) {
                                $scope.coords.lon = loc.lon.toFixed(4);
                                $scope.coords.lat = loc.lat.toFixed(4);
                                setActive(ctrlName);

                                DATA.get('WsTvwsLookup',function(data) { 
                                    $scope.channels = data; 
                                    DATA.get('WsChannelsList', function(data) {});
                                }, loc);
                           }; break;
                        case 'center' : cb = function(loc, el) {
                                            $scope.coords.lon = loc.lon.toFixed(4);
                                            $scope.coords.lat = loc.lat.toFixed(4);
                                            setActive(ctrlName);
                                        }; break;
                        case 'elevation' : cb = function(loc, el) {
                                            $scope.coords.elevation = el.toFixed(4);
                                            $scope.coords.lon = loc.lon.toFixed(4);
                                            $scope.coords.lat = loc.lat.toFixed(4);
                                            setActive(ctrlName);
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
            $scope.devices = false;
            $scope.channels= false;

            $scope.coords = {};
            $scope.locAddress = function() {
                GEO.locAddress( $scope.addr, function(coords) { 
                    $scope.coords = coords;
                    $scope.$digest();
                });
            }
        }
    }
}])
;
window.whitespacePluginLoaded = true;
