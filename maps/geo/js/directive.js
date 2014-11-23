APP
.directive('mapWs', ['TPL', 'GEO'',  function(TPL, GEO) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.mapWs,
        link: function(scope, el) {
            LG( GEO , 'geo ');
            setTimeout( function() { GEO.init(el[0]); }, 0);
        }
    }
}])
.directive('leftWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.leftWs,
        link: function(scope, el) {
        }
    }
}])
.directive('rightWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.rightWs,
        link: function(scope, el) {
        }
    }
}])
.directive('menuWs', ['TPL', 'OLCtrl', function(TPL, OLCtrl) {
    return {
        restrict: 'A',
        replace: true,
        template:  TPL.menuWs,
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
