	$(document).ready( function() {
		$('.rate-points .number').text('+' + getRating());

		var tags = [ {"name" : "css", "href" : "http://www.shidokanmontreal.ca/"}, 
                     {"name" : "css2"}, 
                     {"name" : "css3"}, 
                     {"name" : "moreStuff"}
        ];
		for (var i=0; i<tags.length; i++){
			$('.tagstagstags').append('<a href="' + tags[i].href + '">' + tags[i].name + '</a>');
	    }	
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
	
