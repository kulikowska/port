APP
.directive('mainContent', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.content,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('canvasTest', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.canvasTest,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
