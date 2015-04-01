APP
.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['Content-Type']       = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.interceptors.push(['$q', function($q) {
            return {
                request: function(config) {
                    if (config.data && typeof config.data === 'object') {
                        config.data = $.param(config.data);
                    }
                    return config || $q.when(config);
                }
            };
        }]);
    }
])
.directive('content', ['$http', function($http) {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.header,
        link: function($scope, $element, $attributes) {
            $scope.newUser = 'test';
            $scope.newPwd = 'test';

            $scope.register = function(user, pwd, cb) {
                $http.post('controllers/index.php?user=jo', { user : user, password : pwd }).success(function(data) {
                    $scope.message = data.msg;
                    if (!data.success) {
                        $scope.falseMsg = data.msg;
                        console.log('failed');
                    } 
                    else {
                        $scope.successful = true;
                        $scope.falseMsg = '';
                        console.log('succeeded');
                    }
                    console.log(data);
                    //console.log($scope.message);
                });
            }
            $scope.login = function(user, pwd, cb) {
                $http.post('controllers/login.php', { user : user, password : pwd}).success(function(data) {
                    console.log(data);
                    if (!data.success) {
                        $scope.loggedIn = false;
                        $scope.falseLg = data.msg;
                    }
                    else {
                        $scope.loggedIn = true;
                        $scope.falseLg = '';
                    }
                });
             }
        }
    }
}])
;
