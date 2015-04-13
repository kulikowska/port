APP
.directive('mainContent', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.middleDiv = 'middleGround';
            $scope.smaller = 'smaller';
            $scope.smallest = 'smallest';

            $scope.showPort = function() {
                if (!$scope.portfolio) {
                    $scope.portfolio = true;
                    $scope.middleDiv = 'shrunkMiddle';
                    //$scope.hideEm = 'hidden';
                    $scope.smaller = 'evenSmaller';
                    $scope.smallest = 'evenSmallest';
                    $scope.mainUl = 'shrunkUl';
                }
                else {
                    $scope.portfolio = false;
                    $scope.middleDiv = 'middleGround';
                    $scope.hideEm = '';
                    $scope.smaller = 'smaller';
                    $scope.smallest = 'smallest';
                    $scope.mainUl = '';
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
 
