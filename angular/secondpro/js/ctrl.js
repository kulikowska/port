AP
.controller('datahomie', ['$scope', '$http', function ($scope, $http) {
	$http.get('data/hommies.json').success(function(data){ 
		$scope.list = data 
	});
}]) 
.directive('biglist', function() {
	return {
		restrict: 'ACE',
		template: '<gridhead></gridhead><content></content>',
		link: function($scope, $element, $attributes) { }
	}
})
.directive('gridhead', function() {
	return {
		restrict: 'ACE',
		templateUrl: 'tpl/gridhead.tpl',
		link: function($scope, $element, $attributes) { }
	}
})
.directive('content', function() {
	return {
		restrict: 'AE',
		templateUrl: 'tpl/content.tpl',
		link: function($scope, $element, $attributes) { }
	}
})
.filter('headString', function() {
	return function(input) {
		var ret = '';
		switch (input) {
			case 0 : ret = 'ID'; break;
			case 1 : ret = 'First Name'; break;
			case 2 : ret = 'Last Name'; break;
			case 3 : ret = 'E-mail'; break;
			default : ret = 'Error'; break;
		}
		return ret;
	}
})
.filter('oddEven', function() {
	return function(input) {
		if (input == 0 || input == 2 || input ==4) return "odd";
		else return 'even';
	}
})
;
