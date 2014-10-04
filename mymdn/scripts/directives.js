APP
.directive('start', function() {
    return {
        restrict: 'C',
        replace: true, 
        template: '<div class="first">This is a the first div </div>',
        link: function($scope, $element, $attributes) {}
        }
    })
;

alert('working');

