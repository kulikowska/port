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
            $scope.sport= '1';

             $scope.getData = function() {
                // DONE: Change this controller name from index to get or getData, make those changes in Controller directory (rename file)
                // DONE: Change the name of this function to something like get or getData (in html template somewhere)
                $http.get('route.php?ctrl=getData').success(function(data) { 
                    $scope.angularData = data;
                    console.log(data);
                })
             }

             $scope.insertData = function(first, last, sport) {
                // DONE: Use POST for inserting and change the name from postAngularData to something like insertData or just insert to make it clear
                $http.post('route.php?ctrl=insert', { first : first, last : last, sport : sport }).success(function(data) {
                    $scope.getData();
                });  
             }

             $scope.updateData = function(id, first, last, sport) {
                $http.post('route.php?ctrl=update', { id: id, first: first, last: last, sport: sport })
                    .success(function(newdata) {
                        $scope.newData = newdata;
                    });

                console.log(id, first, last, sport);
             }

             $scope.deleteData = function(id) {
                $http.get('route.php?ctrl=delete&id=' + id ).success(function(data) {
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
