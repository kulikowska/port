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
		
		var storeObj = {};

		for (var i=0; i<allLi.length; i++){
		    if ($(allLi[i]).find('[type="checkbox"]').is(':checked')) {
				$(allLi[i]).hide();
			} else { 
                // allLi is an Array of DOM elements, therefore allLi[i] (for some i in range) will be an individual DOM element.
                //
                // allLi[i].outerHTML in this case is html of the entire element.  
                // allLi[i].innerHTML would be the html of what is inside the element but it would not include <li> and </li> tags
                // experiment with innerHTML and outerHTML
                // Also, allLi[i] is a DOM element corresponding to an individual LI,  it is not a jQuery elment.
                //
                // So, allLi[i].html() doesn't make sense because allLi[i] does not have a function html(), since it is a DOM object
                // Similarly, $(allLi[i]).innerHTML won't work either because jQuery does not have innerHTML property, this is a jQuery object
                // We need to call methods and properties on an object we are working with like $(allLi[i]).html() and allLi[i].innerHTML
                //
                // Now, it is easy to convert DOM element like allLi[i] into jQuery element like this $(allLi[i])
                // Going the other way uses a 'trick' (not really, but whatever).  
                // If you have a jquery element like $('#container') you obtain DOM element from it by calling $('#container').get()[0]
                // So $('#container').html() is the same as $('#container').get()[0].innerHTML
                //
                // Yeah, this one takes a little time to digest and in order to really understand it, you need to use it/experiment with it
                // But once you play with it a bit it becomes quite simple actually.
                //
                storeObj[i] = allLi[i].outerHTML;

                 // ready to save in local storage
				 console.log([ storeObj] );
			}
		}
    }
}
