function addtolist() {
	var item = $('[name="task"]').val();
	$('.container ul').append("<li>" + item + "<input type='checkbox' name='done'>" +  "</li>");
}

function removeTask() {
	
}
