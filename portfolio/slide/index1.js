$(document).ready(function() {

	var currentPosition = 0;
	var slideWidth = 650;
	var slides = $('.slide');
	var numberOfSlides = slides.length;
	var slideShowInterval;
	var speed = 6000;

	//Timer
	slideShowInterval = setInterval(changePosition, speed);

	slides.wrapAll('<div id="slidesHolder"></div>')

	slides.css({ 'float' : 'left' });
	
	$('#slidesHolder').css('width', slideWidth * numberOfSlides);

	$('.container')
		.prepend('<span class="nav" id="leftNav">Move Left</span>')
		.prepend('<span class="nav" id="rightNav">Move Right</span>');

	manageNav(currentPosition);

	$('.nav').bind('click', function() {

	currentPosition = ($(this).attr('id') == 'rightNav' )
	? currentPosition + 1 : currentPosition - 1;

	manageNav(currentPosition);
	clearInterval(slideShowInterval);
	slideShowInterval = setInterval(changePosition, speed);
	moveSlide();
});

  function manageNav(position) {
  	if(position==0) { 
		$('#leftNav').hide() 
	} else {
		$('#leftNav').show()
	}

	 if(position==numberOfSlides-1){ 
	 	$('#rightNav').hide() 
	 } else { $('#rightNav').show() 
	 }
  }

	function changePosition() {
		if(currentPosition == numberOfSlides - 1) {
			currentPosition = 0;
			manageNav(currentPosition); 
		} else {
			currentPosition++;
			manageNav(currentPosition);
		}
		moveSlide();
	}

	function moveSlide() {
		$('#slidesHolder').animate({'marginLeft' : slideWidth*(-currentPosition)
		});
	}
});
