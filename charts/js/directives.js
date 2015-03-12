APP
.directive('content', ['TPL', '$http', function(TPL, $http) {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
       // template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.angularData = 'empty';
            $scope.something = 'some random string';

             $scope.getAngularData = function() {
                $http.get('Controllers/test.php').success(function(data) { 
                    $scope.angularData = data;
                    console.log(data);
                })
             }

             $scope.postAngularData = function(cb) {
                $http({
                    url: 'Controllers/index.php',
                    method: 'POST',
                    data: JSON.stringify($scope.something),
                }).
                success(cb);
                alert($scope.something);
            }
         }
      }
}])
;
