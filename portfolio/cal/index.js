Actions = {
    'addToList' : function() {
        var item = $('[name="task"]').val();
        $('.container ul').append("<li>" + item + "<input type='checkbox' name='done'>" +  "</li>");
    },
    'removeTask()' : function() {
    }
}
