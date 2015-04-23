APP
.directive('mainHeader', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.middleDiv = 'middleGround';
            $scope.smaller = 'smaller';
            $scope.smallest = 'smallest';
            $scope.imageContainer = 'imageContainer';
            $scope.footerClass = 'footer';
            
            $scope.showHideFooter = function() {
                if (!$scope.noFooter) {
                    $scope.footerClass = 'shrunkFooter';
                    $scope.noFooter = true;
                }
                else {
                    $scope.noFooter = false;
                    $scope.footerClass = 'footer';
                }
            }

            $scope.showPort = function() {
                if (!$scope.portfolio) {
                    $scope.portfolio = true;
                    $scope.imageContainer = 'shrunkImageContainer';
                    $scope.middleDiv = 'shrunkMiddle';
                    //$scope.hideEm = 'hidden';
                    $scope.smaller = 'evenSmaller';
                    $scope.smallest = 'evenSmallest';
                    $scope.mainUl = 'shrunkUl';
                }
                else {
                    $scope.portfolio = false;
                    $scope.middleDiv = 'middleGround';
                    $scope.imageContainer = 'imageContainer';
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
.directive('footer', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/footer.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
 
