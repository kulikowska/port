function show(arg) {
	alert(arg);
}

function writeToDiv( arg ) {
	var wd  = document.getElementById('writeDiv');
	console.log( wd );
	wd.html =  arg;
}
