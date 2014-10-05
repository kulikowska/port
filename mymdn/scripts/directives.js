APP
.directive('header', function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/header.html',
        link: function($scope, $element, $attributes) {
            $scope.user = 'username';
            $scope.password = '';

            $scope.logIn = function() {
                $scope.user = '';
                $scope.password = '';
            }
            }
        }
 })
;
