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
            $scope.vis = false;
            $scope.rng = [true, true, true];

            $scope.$on('chanLoad', function() { 
                $scope.vis = {}; 
                for (var i in DATA.chanIdx()) $scope.vis[i] = 0; 
            });

            var setVis = function(chanId) {
                var active = $scope.active; 
                if ($scope.vis) {
                    if ($scope.active != chanId )
                        $scope.vis[$scope.active] == 2 && ($scope.vis[$scope.active] = 1);

                    $scope.vis[chanId] = $scope.vis[chanId] ? $scope.vis[chanId] - 1 : 2;
                    $scope.active = chanId;
                }
            };

            $scope.chanSel = function(chanId) {
                setVis(chanId);

                $scope.selChan = DATA.findChan(chanId);
                $scope.chanDevs = DATA.chanLoc(chanId);
                if (typeof $scope.chanDevs == 'undefined')
                    $scope.notify( 'No devices loaded for channel Id: ' +  chanId);
                else
                    GEO.chanVis(chanId, $scope.chanDevs, $scope.active == chanId, 1, function(data) {
                    });
            };
            $scope.range = function(idx) { GEO.range(idx, $scope.rng[idx]); };

            /* TEST INIT */
            setTimeout(function() { $scope.chanSel(22); $scope.$digest(); }, 2000);
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

            var ctrls = {
                box : function(tL, bR) {
                    $scope.coords.lon = tL.lon.toFixed(4);
                    $scope.coords.lat = tL.lat.toFixed(4);
                    setActive('box');

                    DATA.get('WsDeviceList',function(data) {
                        $scope.devices=data;
                        DATA.get('WsDeviceDetails',function(data) {
                            $scope.notify('Loaded ' + data.length + ' devices');
                        });
                    },tL,bR);
                },
                point : function(loc, el) {
                    $scope.coords.lon = loc.lon.toFixed(4);
                    $scope.coords.lat = loc.lat.toFixed(4);
                    setActive('point');

                    DATA.get('WsTvwsLookup',function(data) { 
                        $scope.channels = data; 
                        DATA.get('WsChannelsList', function(data) {});
                        $scope.$parent.$broadcast('chanLoad');
                    }, loc);
                },
                center : function(loc, el) {
                    $scope.coords.lon = loc.lon.toFixed(4);
                    $scope.coords.lat = loc.lat.toFixed(4);
                    setActive('center');
                },
                elevation : function(loc, el) {
                    $scope.coords.elevation = el.toFixed(4);
                    $scope.coords.lon = loc.lon.toFixed(4);
                    $scope.coords.lat = loc.lat.toFixed(4);
                    setActive('elevation');
                }
            };

            $scope.activate = function(ctrlName) { 
                OLCtrl.deactivate($scope.active ? $scope.active : 'elevation');
                if (ctrlName != $scope.active) {
                    $scope.active && ($scope[$scope.active] = 0);
                    $scope.active = ctrlName;
                    $scope[ctrlName] = 1;

                    OLCtrl.activate(ctrlName, ctrls[ctrlName]);
                } else { 
                    $scope[$scope.active] = 0;
                    $scope.active = '';
                }
            };

            setTimeout( function() { 
                /* TEST INIT */
                $scope.activate('box'); 
                ctrls.box({lat: 20.50, lon: 53.959}, {lat: 27.30, lon: 65.959});
                ctrls.point({lat: 20.50, lon: 53.959});
                $scope.activate('center');
                $scope.$digest(); 
            }, 200);
        }
    }
}])
.directive('footerWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.footerWs,
        link: function($scope, el) { 
        }
    }
}])
.directive('whitespace', ['TPL', 'GEO', function(TPL, GEO) {
    return {
        restrict: 'E',
        replace:false,
        scope: {plugData: "="},
        template: TPL.whitespace,
        link: function($scope, $element, $attributes) {
            $scope.message = '';
            $scope.devices = false;
            $scope.channels= false;
            $scope.$watch('message', function(a,b) { LG( 'watch', $scope.messaage, a,b);} );
            $scope.notify = function(msg, status, duration) {
                $scope.message = msg;;
            }

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
