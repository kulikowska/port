function playVid( el, url, start, end ) {
	 $('#list li').removeClass('selected');
     $(el).addClass('selected');
     $('#notify').text('Video Opened'); 
     $('#video input').show();
     $('#video .rickyVids iframe').remove(); 
     $('#video .rickyvids').append( '<iframe type="text/html" width="650" height="500"' 
                         + 'src="http://www.youtube.com/v/' + url 
                         + '&autoplay=true&start=' + start 
                         + '&end=' + end 
                         + '" autoplay ></iframe>');
}

function closeVid() {
	$('#video .rickyVids iframe').remove();
	$('#video input').hide();
	$('#list li').removeClass('selected');
}
