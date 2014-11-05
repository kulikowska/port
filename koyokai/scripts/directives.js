APP
.directive('header', function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/header.html',
        link: function($scope, $element, $attributes) {
            }
        }
 })
.directive('dropdown', function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/dropdown.html',
        link: function($scope, $element, $attributes) {
            $scope.menu = ['About', 'Gallery', 'Members', 'Kendo', 'Events'];
            $scope.headerImg='headerimg';

            $scope.shrinkAndSelect=function(value) {
                $scope.headerImg='shrunk';
                $scope.selected = value;
            };

            $scope.itemClass = function(value) {
                return value === $scope.selected ? 'active' : undefined;
            };

            $scope.expandAndGo=function() {
                $scope.headerImg='homeimg';
                $scope.selected = '';
                };
            }
        }
 })
.directive('home', function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/home.html',
        link: function($scope, $element, $attributes) {
            }
        }
 })
;
