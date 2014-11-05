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

            $scope.shrinkAndSelect=function(value, idx) {
                $scope.headerImg='shrunk';
                $scope.selected = value;
                $scope.tabIdx = idx;
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
.directive('about', function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/about.html',
        link: function($scope, $element, $attributes) {
            }
        }
 })
.directive('gallery', function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/gallery.html',
        link: function($scope, $element, $attributes) {
            }
        }
 })
.directive('members', function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/members.html',
        link: function($scope, $element, $attributes) {
            }
        }
 })
;
