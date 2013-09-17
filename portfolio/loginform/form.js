dataObj = {};

function saveform(){
    dataObj.first = $('form [name="first"]').val();
    dataObj.last= $('form .last').val();
    dataObj.email = $('form #email').val();
	console.log( dataObj );
}
