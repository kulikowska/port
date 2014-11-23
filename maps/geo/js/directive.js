APP
.directive('mapWs', ['GEO', 'OL',  function(GEO, OL) {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="content"></div>',
        link: function(scope, el) {
            LG( GEO , 'geo ');
            setTimeout( function() { GEO.init(el[0]); }, 0);
        }
    }
}])
.directive('leftWs', [function() {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="left">left pane</div>',
        link: function(scope, el) {
        }
    }
}])
.directive('rightWs', [function() {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="right">right pane</div>',
        link: function(scope, el) {
        }
    }
}])
.directive('menuWs', ['TPL', 'OLCtrl', function(TPL, OLCtrl) {
    return {
        restrict: 'A',
        replace: true,
        template:  TPL.menuWs,
        /*
        '<div id="contentMenu"><button ng-click="activate(\'box\');">Box</button><button ng-click="activate(\'point\');">Point</button><button ng-click="activate(\'center\');">Center</button></div>',
        */
        link: function($scope, el) {
            $scope.activate = function(what) { OLCtrl.activate(what); }
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
        /*
            '<div id="container">' +
                '<div left-ws></div><div menu-ws></div><div map-ws></div><div right-ws></div>' +
                '<div footer-ws></div>' +
            '</div>'
            */
        link: function($scope, $element, $attributes) {
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
