APP
.directive('header', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/header.html',
        //template: TPL.header,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('dropdown', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/dropdown.html',
        //template: TPL.dropdown,
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
 }])
 .filter('checkActive', function() {
    return function(input) {
        return input ? 'active' : '';
    };
})
 .filter('toMenuText', function() {
    return function(input) {
        var ret;
        switch(input) {
            case 0:     ret = "Home";      break;
            case 1:     ret = "About";      break;
            case 2:     ret = "Gallery";    break;
            case 3:     ret = "Members";    break;
            case 4:     ret = "Kendo";      break;
            case 5:     ret = "Events";     break;
            default :   ret = 'out of range'; break;
       }
       return ret;
    };
})
.directive('home', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/home.html',
        //template: TPL.home,
        link: function($scope, $element, $attributes) {
            $scope.contentVal = 'content';
            }
        }
 }])
.directive('homecontent', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/homecontent.html',
        //template: TPL.homecontent,
        link: function($scope, $element, $attributes) {
            $scope.contentVal = 'content';
            $scope.contact = true;

                $scope.showEvents= function() {
                    if (!$scope.events) {
                        $scope.events = true;
                        $scope.contact = false;
                        $scope.links= false;
                    }
                    else {
                        $scope.events = false;
                    }
                }   
                $scope.showContact= function() {
                    if (!$scope.contact) {
                        $scope.contact= true;
                        $scope.events= false;
                        $scope.links= false;
                    }
                    else {
                        $scope.contact= false;
                    }
                }   
                $scope.showLinks= function() {
                    if (!$scope.links) {
                        $scope.links= true;
                        $scope.events= false;
                        $scope.contact= false;
                    }
                    else {
                        $scope.links= false;
                    }
                }
            }
        }
 }])
.directive('about', [function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/about.html',
        //template: TPL.about,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('gallery', [function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/gallery.html',
        //template: TPL.gallery,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('members', [function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/members.html',
       // template: TPL.members,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('kendo', [function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/kendo.html',
        //template: TPL.kendo,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('events', [function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/events.html',
        //template: TPL.events,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('footer', [function() {
    return {
        restrict: 'ACE',
        replace: false,
        templateUrl: 'html/footer.html',
        //template: TPL.footer,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
;
