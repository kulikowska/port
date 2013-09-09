	function addRating() {
		var currentRating = $('.rate-points .number').text();
		console.log( currentRating);
		var intRating = parseInt(currentRating);
		console.log( intRating );
		intRating += 2;
		$('.rate-points .number').text('+' +  intRating);
	}
