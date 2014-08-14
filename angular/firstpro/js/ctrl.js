AP
.controller('dad', function ($scope) {
	$scope.datavar = 'some data';
	$scope.topdiv = true;
	$scope.divToggle = [false, false, true];
	$scope.changeTab = function(arg) {
		for (var i=0; i<3; i++)
			$scope.divToggle[i] = false;
			$scope.divToggle[arg] = true;
	};
	$scope.list=[
		{"first":"jo", "last":"blo", "email":"jo@blo"},
		{"first":"bill", "last":"dude", "email":"bill@dude"},
		{"first":"guy", "last":"williams", "email":"guy@williams"}
	];
	$scope.myclick=function(arg){
		$scope.item=arg; 
	};
	$scope.showLeft=true;
	$scope.switchit=function(){
		$scope.showLeft = !$scope.showLeft;
		};
})

.controller('bigass', function ($scope) {
	$scope.myvar="mystring"; 
	$scope.bigassclass=0;

	$scope.rotate = function() {
		if ($scope.bigassclass >2) $scope.bigassclass =0;
		else $scope.bigassclass++;
	}
})
.controller('justass', function ($scope) {
	$scope.myvar="mystring"; 
	$scope.list=[
		{"first":"jo", "last":"blo"},
		{"first":"bill", "last":"dude"}
	];
	$scope.bigassclass=1;
	$scope.myclick=function(arg){
		$scope.item=arg; 
	};
})
.controller('puppyctrl', function ($scope) {
	$scope.puppies = [
		{"breed":"rottie", "cuteness":9},
		{"breed":"pittie", "cuteness":8},
		{"breed":"husky", "cuteness":8}
	];
})
.filter('howcute', function() {
  	return function(input, arg1, arg2) {
		console.log( input, arg1 , arg2);
  		if (input == 9) return 'really fucking cute';
		else return 'almost really fucking cute';
  	};
})
.filter('divcolor', function() {
  	return function(input) {
		var ret;
		input = parseInt(input);
		switch (input) {
			case 0: ret = 'red'; break;
			case 1: ret = 'yellow'; break;
			case 2: ret = 'blue'; break;
			case 3: ret = 'green'; break;
			default: ret = 'green';
		}
		console.log( ret );
		return ret;
  	};
})
.directive('smallbox', function() {
	return {
		restrict: 'EAC',
		replace: false,
		template: '<div style="height:100px; width:300px; background:#abc;">smallbox directive template{{datavar}}</div>',
		link: function($scope, $element, $attributes) {
			$scope.datavar = 'local directive var';
		}
	}
})
.directive('buttoncolor', function() {
	return {
		restrict: 'E',
		template: '<button ng-click="bigassclass=0">Red</button>' 
				+ '<button ng-click="bigassclass=1">Yellow</button>'
				+ '<button ng-click="bigassclass=2">Blue</button>'
				+ '<button ng-click="rotate()">Rotate</button>',
		}
	})
.directive('buttons', function() {
	return {
		restrict: 'E',
		replace: false,
		template: '<button value="first" ng-click="changeTab(0)" >first</button>'
				  + '<button value="second" ng-click="changeTab(1)">second</button>'
			      +	'<button value="third" ng-click="changeTab(2)" >third</button>',
		link: function($scope, $element, $attributes) {
			$scope.datavar = 'local directive var';
		}
	}
})
.directive('showli', function() {
	return {
		restrict: 'A',
		replace: false,
		template: '<ul>'
					+ '<li ng-show="divToggle[0]">first li</li>'
					+ '<li ng-show="divToggle[1]">second li</li>'
					+ '<li ng-show="divToggle[2]">third li</li>'
				+ '</ul>',
		link: function($scope, $element, $attributes) {
			$scope.datavar = 'local directive var';
		}
	}
})
.directive('wrap', function() {
	return {
		restrict: 'E',
		replace: false,
		template: '<buttons></buttons><br /><div showli></div>',
		link: function($scope, $element, $attributes) {
			$scope.datavar = 'local directive var';
		}
	}
})
;
