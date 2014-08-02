AP
.controller('dad', function ($scope) {
	$scope.datavar = 'some data';
	$scope.topdiv = true;
	$scope.toggle = function() {
		$scope.topdiv = !$scope.topdiv;
	};
	$scope.divToggle = [true, false ,false];
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
	$scope.bigassclass="red";
})
.controller('justass', function ($scope) {
	$scope.myvar="mystring"; 
	$scope.list=[
		{"first":"jo", "last":"blo"},
		{"first":"bill", "last":"dude"}
	];
	$scope.bigassclass="yellow";
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
  	return function(input) {
  		if (input == 9) return 'really fucking cute';
		else return 'almost really fucking cute';
  	};
})
;
