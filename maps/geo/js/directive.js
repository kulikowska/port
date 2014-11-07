APP
.directive('mapWs', ['GEO', function(GEO) {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="content"></div>',
        link: function(scope, el) {
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
.directive('menuWs', [function() {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="contentMenu">menu here</div>',
        link: function(scope, el) {
        }
    }
}])
.directive('footerWs', [function() {
    return {
        restrict: 'A',
        replace: true,
        template:
            '<div id="footer" ng-init="addr=\'164 Legionów Gdynia Poland\';">' +
                '<div id="panel">' +
                  '<input id="address" type="textbox" ng-model="addr">' +
                  '<input type="button" value="Locate on Map" ng-click="locAddress()">' +
                '</div>' +
                '<div>Lon: {{coords.lon}}, Lat: {{coords.lat}}</div>' +
            '</div>',
        link: function(scope, el) {
        }
    }
}])
.directive('whitespace', ['GEO', function(GEO) {
    return {
        restrict: 'E',
        replace:false,
        scope: {plugData: "="},
        template:
            '<div id="container">' +
                '<div left-ws></div><div menu-ws></div><div map-ws></div><div right-ws></div>' +
                '<div footer-ws></div>' +
            '</div>'
        ,
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
