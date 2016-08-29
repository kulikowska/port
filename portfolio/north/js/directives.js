APP
.directive('content', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.directive('projects', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/projects.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.tabId = 0;
            $scope.toggleLeft = function() {
                if ($scope.tabId < 0) {
                    $scope.tabId += 100;
                    console.log($scope.tabId);
                }
            }

            $scope.toggleRight = function() {
                if ($scope.tabId > -200) {
                    $scope.tabId -= 100;
                    console.log($scope.tabId);
                }
            }
         }
      } 
 }])
 .filter('checkActive', function() {
    return function(input) {
        return input ? 'active' : '';
    };
})
