APP
.directive('mainContent', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.tabIdx = 1;
         }
      } 
 }])
.directive('projects', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/projects.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.directive('contact', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/contact.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.directive('scissors', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/scissors.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
 
