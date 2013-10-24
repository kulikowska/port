var Actions = {
    'container' : '.container ul',
    'addToList' : function() {
        var item = $('[name="task"]').val();
        $(this.container).append("<li>" + item + "<input type='checkbox' name='completed'>" +  "</li>");
		//
        //$(Actions.container).append("<li>" + item + "<input type='checkbox' name='done'>" +  "</li>");
    },
    'removeTask' : function() {
		var allLi = $(this.container).find('li');
		
		var storeObj = {}

		for (var i=0; i<allLi.length; i++){
		    if ($(allLi[i]).find('[type="checkbox"]').is(':checked')) {
				$(allLi[i]).hide();
			} else { 
                storeObj[i] = allLi[i].outerHTML;

                 // ready to save in local storage
				 console.log([ storeObj] );
			}
		}
    }
}
