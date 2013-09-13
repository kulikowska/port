	$(document).ready( function() {
		$('.rate-points .number').text('+' + getRating());
	});

	function addRating() {
		var currentRating = $('.rate-points .number').text();
		var intRating = parseInt(currentRating);
		intRating += 1;
		if (intRating > 0) {
		    intRating = '+' + intRating;
        }
		$('.rate-points .number').text(intRating);
		saveRating(intRating);
	}

	function subtractRating() {
		var currentRating = $('.rate-points .number').text();
		var intRating = parseInt(currentRating);
		intRating -= 1;
		if (intRating > 0) {
		    intRating = '+' + intRating;
        }
		$('.rate-points .number').text(intRating);
		saveRating(intRating);
	}

	function clearLocal() {
		localStorage.clear();
		document.location = document.location;
	}

	function saveRating ( val ) {
		localStorage['ratingValue'] = parseInt(val);
	}

	function getRating() {
		if (typeof localStorage['ratingValue'] == 'undefined' ) {
			return 20;
		} else {
			return localStorage['ratingValue'];
		}
	}


	console.log ( 'Console log starts here' );
	console.log ( ' ' );
	console.log ( ' Objects ' );
	console.log ( ' ' );
	 
	var myObject = {};

	myObject.hi = 'First one';
	myObject['wassup'] = 'middle';
	myObject.bye = 'Last one';
	console.log( myObject );
	 
	var hi = myObject.hi;
	var bye1 = myObject['bye'];

	console.log( 'First one and last one: ' + hi + ' ' + bye1);

	console.log( 'First and last retrieved directly (not from the var): ' + myObject.hi + ' '  + myObject['wassup'] + ' ' + myObject.bye );

	myObject = {'first' : 'Jo' , 'last' : 'Blo', 'phone' : '555-555-5555' , 'email' : 'jo@blo.com'};

	console.log( 'Phone is: ' + myObject.phone + ' and email is ' + myObject['email']);

	myObject.email = 'new@email.com';
	myObject['phone'] = '123-456-7890';

	console.log( ' After changing the values phone is: ' + myObject.phone + ' and e-mail is: ' + myObject['email']);

	console.log( ' ' );
	console.log( ' Arrays ' );
	console.log( ' ' );

	var myArray = [];

	myArray = ['joe', 'blo', '555-555-5555', 'joe@blo.com'];

	console.log( 'The whole array is: ' + JSON.stringify(myArray));
	console.log( 'Name is: ' + myArray[0] + ',  phone is ' + myArray[2] + ', email is ' + myArray[3]);

	myArray[0] = 'Joe 2';
	myArray[2] = '123-345-4325';

	console.log( 'After change name is: ' + myArray[0] + ', and phone is ' + myArray[2]);
	 
	console.log ( ' ' );
	console.log ( 'Object of arrays');
	console.log ( ' ' );

	var	 bigObject = { 'strong' : ['pitties', 'rotties'], 'fast' : ['huskies', 'greyhounds']};

	console.log( 'The whole object is this: ' +JSON.stringify(bigObject) );
	console.log( 'Strong dogs: ' + bigObject.strong );
	console.log( 'But this one is slow: ' + bigObject.strong[1] );
	console.log( 'Fast dog: ' + bigObject.fast[0] );
	console.log( 'Even faster dog: ' + bigObject.fast[1] );
	
	console.log( ' ' );
	console.log( 'Array of Objects');
	console.log( ' ' );

	var bigArray = [{'first' : 'Jo', 'last' : 'Blo'},{'name' : 'Bill', 'email' : 'bill@nothing.com'}];

	console.log( 'The whole array is this: ' +JSON.stringify(bigArray) );
	console.log( 'Email field of the second array object: ' + bigArray[1]['email']);
	console.log( 'First field of the first array object: ' + bigArray[0].first);
	console.log( 'Last field of the first array object: ' + bigArray[0]['last']);

	bigArray[0]['last'] = 'new value';
	
	console.log( 'After change of the last field of the first array object: ' + bigArray[0]['last']);
	console.log( 'The whole array after change: ' + JSON.stringify(bigArray) );

	// Cool, I'm getting the swing of it. I definitely get everything in theory, 
	// but I'll mess around with it some more to really get a feel for it. 
