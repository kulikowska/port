APP
.directive('header', function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/header.html',
        link: function($scope, $element, $attributes) {
            alert('hi');
            }
        }
 })
;
