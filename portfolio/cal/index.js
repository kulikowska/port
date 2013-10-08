var Actions = {
    'container' : '.container ul',
    'addToList' : function() {
        var item = $('[name="task"]').val();
        $(this.container).append("<li>" + item + "<input type='checkbox' name='done'>" +  "</li>");
        //$(Actions.container).append("<li>" + item + "<input type='checkbox' name='done'>" +  "</li>");
    },
    'removeTask' : function() {
    }
}
