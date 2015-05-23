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
        }
      } 
 }])
.directive('portfolio', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/portfolio.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.directive('footerContainer', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/footer.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
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
         }
      } 
 }])
.filter('checkActive', function() {
    return function(input) {
        return input ? 'active' : '';
    };
})
 
