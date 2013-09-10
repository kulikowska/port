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
