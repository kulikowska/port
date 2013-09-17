$(document).ready( function() {
console.log( localStorage );
dataObj = {};

var storedData = JSON.parse( localStorage['ourData'] );
console.log( storedData );
console.log(storedData.first); 
$('form [name="first']).val('some crap');
}
);


function saveform(){
/*
    dataObj.first = $('form [name="first"]').val();
    dataObj["first"] = $('form [name="first"]').val();
    dataObj.last  = $('form .last').val();
    dataObj.email = $('form #email').val();
*/

    dataObj = {
        "first" : $('form [name="first"]').val(),
        "last"  : $('form .last').val(),
        "email" : $('form #email').val()
    };

    localStorage['ourData'] = JSON.stringify(dataObj);


	console.log( dataObj );
	console.log( localStorage );
}
