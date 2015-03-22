APP
.directive('content', ['$http', function($http) {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.header,
        link: function($scope, $element, $attributes) {
            $scope.user = 'test';
            $scope.pwd = 'test';

            $scope.register = function(user, pwd, cb) {
                $http.get('controllers/index.php?user=' + user + '&password=' + pwd).success(function(data) {
                    $scope.successful = true;
                    $scope.user = '';
                    $scope.pwd = '';
                });
            }
        }
    }
}])
;
