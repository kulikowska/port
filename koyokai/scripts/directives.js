APP
.directive('header', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.header,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('dropdown', function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/dropdown.html',
        link: function($scope, $element, $attributes) {
            //$scope.headerImg = 'headerimg';
            //$scope.tabIdx = 0;

            $scope.shrinkAndSelect=function(idx) {
                $scope.tabIdx    = idx;
                $scope.headerImg = idx  ? 'shrunk' : 'homeimg';
                $scope.contentVal = idx ? 'contentexpand' : 'content';
            };

            /*
            $scope.itemClass = function(idx) {
                return idx === $scope.tabIdx? 'active' : undefined;
            };

            $scope.expandAndGo=function() {
                $scope.headerImg = 'homeimg';
                $scope.contentVal = 'content';
                $scope.tabIdx = 6;
            };
            */
        }
    }
 })
 .filter('checkActive', function() {
    return function(input) {
        return input ? 'active' : '';
    };
})
 .filter('toMenuText', function() {
    return function(input) {
        var ret;
        switch(input) {
            case 0:     ret = "home";      break;
            case 1:     ret = "about";      break;
            case 2:     ret = "gallery";    break;
            case 3:     ret = "members";    break;
            case 4:     ret = "kendo";      break;
            case 5:     ret = "events";     break;
            default :   ret = 'out of range'; break;
       }
       return ret;
    };
})
.directive('home', function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/home.html',
        link: function($scope, $element, $attributes) {
            $scope.contentVal = 'content';
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
.directive('kendo', function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/kendo.html',
        link: function($scope, $element, $attributes) {
            }
        }
 })
.directive('events', function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/events.html',
        link: function($scope, $element, $attributes) {
            }
        }
 })
;
