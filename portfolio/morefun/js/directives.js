APP
.directive('mainContent', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.middleDiv = 'middleGround';

            $scope.showPort = function() {
                if (!$scope.portfolio) {
                    $scope.portfolio = true;
                    $scope.middleDiv = 'shrunkMiddle';
                }
                else {
                    $scope.portfolio = false;
                    $scope.middleDiv = 'middleGround';
                }
            }
         }
      } 
 }])
.directive('projects', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/projects.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.directive('contact', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/contact.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
 
