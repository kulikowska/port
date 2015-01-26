APP
.directive('content', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
       // template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.angularData = 'empty';
            google.load('visualization', '1.0', { callback : function() {}, packages: ['corechart', 'table'] });

             $scope.getAngularData = function(data) {
                $http.get('Controllers/index.php').success(data);
                $scope.angularData = data;
             }
         }
      }
}])
;
