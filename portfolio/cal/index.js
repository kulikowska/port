var Actions = {
    'container' : '.container ul',
    'addToList' : function() {
        var item = $('[name="task"]').val();
        $(this.container).append("<li>" + item + "<input type='checkbox' name='done'>" +  "</li>");
        //$(Actions.container).append("<li>" + item + "<input type='checkbox' name='done'>" +  "</li>");
    },
    'removeTask' : function() {
		var allLi = $(this.container);
		for (var i=0; i<allLi.length; i++){
		    if ($('.container li ').is(':checked')){
				allLi[i].hide();
			}
		}
    }
}
