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
            $scope.fname = 'some';
            $scope.lname= 'test';
            $scope.sport = 'data';

             $scope.getAngularData = function() {
                $http.get('Controllers/index.php').success(function(data) { 
                    $scope.angularData = data;
                    console.log(data);

                    console.log($scope.angularData[3].first);
                })
             }

             $scope.postAngularData = function(fname, lname, sport, cb) {
                $http.get('Controllers/index.php?first=' + fname + '&last=' + lname + '&sport=' + sport).success(cb); } 
                }
      }
}])
;
