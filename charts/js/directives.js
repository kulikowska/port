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
            $scope.first = 'robbie';
            $scope.last= 'robertson';
            $scope.sport= 'kendo';

             $scope.getAngularData = function() {
                $http.get('Controllers/index.php').success(function(data) { 
                    $scope.angularData = data;
                    console.log(data);
                })
             }

             $scope.postAngularData = function(first, last, sport) {
                $http.get('Controllers/insert.php?first=' + first + '&last=' + last + '&sport=' + sport);  

                setTimeout(function() {
                    $scope.getAngularData();
                    }, 200);
             }

             $scope.deleteData = function(id) {
                $http.get('Controllers/delete.php?id=' + id ).success(function(data) {
                    var stor = [];
                    for (var i=0; i<$scope.angularData.length; i++)  
                        $scope.angularData[i].id == id || stor.push($scope.angularData[i]);

                    $scope.angularData = stor;
                });  
             }
          }
      }
}])
;
