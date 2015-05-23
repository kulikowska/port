APP
.directive('mainHeader', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.directive('findRides', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/findRides.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
            $scope.tabIdx = 1;
        }
      } 
 }])
.filter('checkActive', function() {
    return function(input) {
        return input ? 'active' : '';
    };
})
 
