AP
.controller('mainass', function ($scope) {
	$scope.parvar = 'parent variable';
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
	$scope.bigassclass="green";
	$scope.myclick=function(arg){
		alert(arg);
	};

	$scope.parvar = 'child var ';
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
	
	$scope.parvar = 'a totally new var ';
})
;
