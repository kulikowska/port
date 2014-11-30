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
            var active = 0;
            $scope.vis = false;
            $scope.rng = [true, true, true];

            $scope.$on('devLoad', function() { 
                LG( 'chan loaded');
                GEO.initChans();
                $scope.vis = {}; 
                for (var i in DATA.chanIdx()) $scope.vis[i] = 0; 
            });

            var setVis = function(chanId) {
                if ($scope.vis) {
                    if (active != chanId )
                        $scope.vis[active] == 2 && ($scope.vis[active] = 1);

                    $scope.vis[chanId] = $scope.vis[chanId] ? 0 : 2;
                    active = chanId;
                }
            };

            $scope.chanSel = function(chanId) {
                setVis(chanId);

                $scope.selChan = $scope.vis[chanId] ? DATA.findChan(chanId) : false;
                $scope.chanDevs = DATA.chanLoc(chanId);
                if (typeof $scope.chanDevs == 'undefined')
                    $scope.notify( 'No devices loaded for channel Id: ' +  chanId);
                else
                    GEO.chanVis(chanId, $scope.chanDevs, $scope.vis[chanId]);
            };
            $scope.range    = function(idx)     { GEO.range(idx, $scope.rng[idx]); };
            $scope.show     = function(showIt)  { GEO.showChan(showIt); };
            $scope.toFront  = function() { GEO.chanToFront(); }
        }
    }
}])
.directive('rightWs', ['TPL', 'GEO', 'DATA', function(TPL, GEO, DATA) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.rightWs,
        //scope:true,
        scope:{ devices: '=', devCenter: '=', toDevId: '=' },
        link: function($scope, el) {
            var active = 0;
            $scope.vis = {}; 

            $scope.$watch('toDevId', function(n, o) {
                if ( typeof n != 'undefined') {
                    $scope.devSel(n);
                    $scope.vis[n] < 1 && $scope.devSel(n);
                }
            });

            $scope.$on('devLoad', function() { 
                GEO.initDevs();
                $scope.vis = {}; 
                for (var i in DATA.devIdx()) $scope.vis[i] = 0; 
            });

            $scope.devSel = function(devId) {
                $scope.selDevice = DATA.findDev(devId);

                typeof $scope.vis[devId] == 'undefined' && ($scope.vis[devId] = 0); 
                typeof active != 'undefined' && $scope.vis[active] && ($scope.vis[active] = 1);
                $scope.vis[devId] = $scope.vis[devId] ? 0 : 2;

                GEO.deviceVis(DATA.findDev(devId)._ID[2], $scope.vis[devId], active, $scope.devCenter);
                active = devId;
            }
            $scope.show     = function(showIt)  { 
                GEO.showDev(showIt); 
                for (var i in $scope.vis)
                    //$scope.vis[i] = showIt ? $scope.vis : 0;
                    $scope.vis[i] = showIt ? 1 : 0;
            };
            $scope.toFront  = function() { $scope.devTop=1; GEO.devToFront(); };
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
            $scope.autoOff = true;
            $scope.devCenter = false;
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
                    $scope.coords.lon = tL.lon.toFixed(2) + '/' + bR.lon.toFixed(2);
                    $scope.coords.lat = tL.lat.toFixed(2) + '/' +  bR.lat.toFixed(2);
                    setActive('box');

                    DATA.get('WsDeviceList',function(data) {
                        $scope.devices=data;
                        DATA.get('WsDeviceDetails',function(data) {
                            $scope.notify('Loaded ' + data.length + ' devices');
                            $scope.$broadcast('devLoad');
                        });
                    },tL,bR);
                },
                point : function(loc, el) {
                    $scope.coords.lon = loc.lon.toFixed(4);
                    $scope.coords.lat = loc.lat.toFixed(4);
                    setActive('point');

                    DATA.get('WsTvwsLookup',function(data) { 
                        $scope.channels = data; 
                        DATA.get('WsChannelsList', function(data) {
                        });
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
                ctrls.box({lat: 16.50, lon: 53.959}, {lat: 27.30, lon: 65.959});
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
            //$scope.devices = false;
            $scope.channels= false;
            $scope.devTop = 1;
            $scope.notify = function(msg, status, duration) {
                $scope.message = msg;;
            }

            $scope.coords = {};
            $scope.locAddress = function() {
                GEO.locAddress( $scope.addr, function(coords) { 
                    $scope.coords = coords;
                    $scope.$digest();
                });
            };
            $scope.toDev = function(devId) { $scope.toDevId = devId; };
        }
    }
}])
;
window.whitespacePluginLoaded = true;
