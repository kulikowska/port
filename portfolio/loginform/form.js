dataObj = {};

var storedData = JSON.parse(localStorage['ourData']);

$(document).ready( function() {
    $('form [name="first"]').val(storedData.first);
});

function saveform(){
    dataObj = {
        "first" : $('form [name="first"]').val(),
        "last"  : $('form .last').val(),
        "email" : $('form #email').val()
    };

    localStorage['ourData'] = JSON.stringify(dataObj);
}
