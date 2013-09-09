	function addRating() {
		var currentRating = $('.rate-points .number').text();
		console.log( currentRating);
		var intRating = parseInt(currentRating);
		console.log( intRating );
		intRating += 1;
		$('.rate-points .number').text(+  intRating);
	}

	function subtractRating() {
		var currentRating = $('.rate-points .number').text();
		console.log( currentRating);
		var intRating = parseInt(currentRating);
		console.log( intRating );
		intRating -= 1;
		$('.rate-points .number').text(+ intRating);
	}
