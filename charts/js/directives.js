APP
.directive('content', ['TPL', '$http', function(TPL, $http) {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
       // template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.angularData = 'empty';
            google.load('visualization', '1.0', { callback : function() {}, packages: ['corechart', 'table'] });

             $scope.getAngularData = function() {
                $http.get('Controllers/index.php').success(function(data) { $scope.angularData = data;})
             }
         }
      }
}])
;
