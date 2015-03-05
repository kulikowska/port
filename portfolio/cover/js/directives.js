APP
.directive('mainContent', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.tabIdx = 2;
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
