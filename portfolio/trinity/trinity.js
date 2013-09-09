	function addRating() {
		var currentRating = $('.rate-points .number').text();
		var intRating = parseInt(currentRating);
		intRating += 1;
			 if (intRating > 0) {
			    intRating = '+' + intRating;}
		$('.rate-points .number').text(+  intRating);
	}

	function subtractRating() {
		var currentRating = $('.rate-points .number').text();
		var intRating = parseInt(currentRating);
		intRating -= 1;
		$('.rate-points .number').text(+ intRating);
	}
