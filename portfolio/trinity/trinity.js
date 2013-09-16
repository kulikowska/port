	$(document).ready( function() {
		$('.rate-points .number').text('+' + getRating());

		var tags = [ {"name" : "css", "href" : "http://www.shidokanmontreal.ca/"}, 
                     {"name" : "css2", "href" : "http://www.icondeposit.com/system:page-tags/tag/css2" }, 
                     {"name" : "css3", "href" : "http://www.icondeposit.com/system:page-tags/tag/css3"}, 
                     {"name" : "design", "href" : "http://www.icondeposit.com/system:page-tags/tag/css3"},
					 {"name" : "fancy-box", "href" : "http://www.icondeposit.com/system:page-tags/tag/fancy-box"},
					 {"name" : "free", "href" : "http://www.icondeposit.com/system:page-tags/tag/fancy-box"},
					 {"name" : "freebie", "href" : "http://www.icondeposit.com/system:page-tags/tag/free"},
					 {"name" : "html", "href" : "http://www.icondeposit.com/system:page-tags/tag/free"},
					 {"name" : "html5", "href" : "http://www.icondeposit.com/system:page-tags/tag/free"},
					 {"name" : "images", "href" : "http://www.icondeposit.com/system:page-tags/tag/images"},
					 {"name" : "jquery", "href" : "http://www.icondeposit.com/system:page-tags/tag/jquery"},
					 {"name" : "nivo-slider", "href" : "http://www.icondeposit.com/system:page-tags/tag/nevo-slider"},
					 {"name" : "quality", "href" : "http://www.icondeposit.com/system:page-tags/tag/quality"},
					 {"name" : "resource", "href" : "http://www.icondeposit.com/system:page-tags/tag/resource"},
					 {"name" : "slider", "href" : "http://www.icondeposit.com/system:page-tags/tag/slider"},
					 {"name" : "template", "href" : "http://www.icondeposit.com/system:page-tags/tag/template"},
					 {"name" : "theme", "href" : "http://www.icondeposit.com/system:page-tags/tag/theme"}


        ];
		for (var i=0; i<tags.length; i++){
			$('.tagstagstags').append('<a href="' + tags[i].href + '">' + tags[i].name + '</a>' + ' ' );
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
	
