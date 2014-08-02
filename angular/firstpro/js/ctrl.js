AP
.controller('dad', function ($scope) {
	$scope.datavar = 'some data';
})

.controller('attempt', function ($scope) {
})
	
.controller('mainass', function ($scope) {
	$scope.topdiv = true;
	$scope.toggle = function() {
		$scope.topdiv = !$scope.topdiv;
	}
})
.controller('bigass', function ($scope) {
	$scope.myvar="mystring"; 
	$scope.list=[
		{"first":"jo", "last":"blo"},
		{"first":"bill", "last":"dude"},
		{"first":"bill", "last":"dude"},
		{"first":"bill", "last":"dude"},
		{"first":"bill", "last":"dude"},
		{"first":"bill", "last":"dude"}
	];
	$scope.bigassclass="red";
	$scope.myclick=function(arg){
		alert(arg);
	};
})
.controller('justass', function ($scope) {
	$scope.myvar="mystring"; 
	$scope.list=[
		{"first":"jo", "last":"blo"},
		{"first":"bill", "last":"dude"}
	];
	$scope.bigassclass="yellow";
	$scope.myclick=function(arg){
		alert(arg);
	};
})
;
