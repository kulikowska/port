if (typeof APP == 'undefined') var APP = angular.module('WS',[]);

window.whitespacePluginLoaded = false;

APP
.controller('loader', ['$scope', '$element', '$compile', function($scope, $element, $compile) {
    $scope.loadWS= function() {
        var s = document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src','./js/directive.js');
        document.getElementsByTagName('head')[0].appendChild(s);
        console.log( $element );
        console.log( $element.find('plugin'));
        setTimeout( function() {
            console.log( window.whitespacePluginLoaded , 'ws loaded');
            $element.find('plugin').append( $compile(angular.element(
                '<whitespace>whitespace plug</whitespace>'
            ))($scope));
        }, 1500);
    }
}]);
