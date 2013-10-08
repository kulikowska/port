function addtolist() {
	var item = $('[name="task"]').val();
	$('.container ul').append("<li>" + item + "</li>");
}
