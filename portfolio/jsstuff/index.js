function makewhite(el) {
	if ( $(el).html() == 'js fuckery' ) {
		$(el).text('its white now');
		$('.content').addClass('white').text('Im White Now!');
	} else {
		$(el).text('js fuckery');
		$('.content').removeClass('white').text('stuff');
		$('.content2').removeClass('black').text('next up');
	}
}

function makeblack(el) {
	if ( $(el).hasClass('white')) {
		$(el).html('Im White Now! And that one is black!');
		$('.content2').addClass('black').text('You Made Me Black!');
	} else {
		alert('click the one above me first');
	}
}

function original(el) {
	if ( $(el).hasClass('black') && $('.content').hasClass('white')) {
		$(el).removeClass('black').text('next up');
	} 
}
