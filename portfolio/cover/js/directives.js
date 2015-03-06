APP
.directive('mainContent', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.tabIdx = 1;
         }
      } 
 }])
.directive('portfolio', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.portfolio,
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
.filter('checkActive', function() {
    return function(input) { return input ? 'active' : '' };
})
 
