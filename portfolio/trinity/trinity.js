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

	var tags = ['css', 'css2', 'css3', 'moreStuff'];

	for (var i=0; i<tags.length; i++) 

	$('.tagstagstags').append('<li>' + tags[i] + '</li>');

	
