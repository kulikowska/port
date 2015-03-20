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
                $http.get('Controllers/insert.php?first=' + first + '&last=' + last + '&sport=' + sport).success(function(data) {
                    $scope.getAngularData();
                });  
             }

             $scope.deleteData = function(id) {
                $http.get('Controllers/delete.php?id=' + id ).success(function(data) {
                    var stor = [];
                    for (var i=0; i<$scope.angularData.length; i++)  
                        $scope.angularData[i].id == id || stor.push($scope.angularData[i]);

                    $scope.angularData = stor;
                });  
             }

             $scope.updateData = function(id, first, last, sport) {
                $http.post('Controllers/update.php', { id: id, first: first, last: last, sport: sport })
                .success(function(newdata) {
                    $scope.newData = newdata;
                });
                console.log(id, first, last, sport);
             }
          }
      }
}])
;
