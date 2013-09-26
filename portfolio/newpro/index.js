var list = [    {"position" : "Guitarist", "name" : "Robbie", "last" : "Robertson", "email" : "Robbie@band.com"},
	            {"position" : "Pianist", "name" : "Richard", "last" : "Emmanuel", "email" : "Richard@band.com"},
			    {"position" : "Drummer", "name" : "Levon", "last" : "Helm", "email" : "Levon@band.com"},
			    {"position" : "Bassist", "name" : "Rick", "last" : "Danko", "email" : "Rick@band.com"},
			    {"position" : "Organist", "name" : "Garth", "last" : "Hudson", "email" : "Garth@band.com"}
]; 

$(document).ready( function() {
    for (var i=0; i<list.length; i++){
        $('.menu').append("<li onClick='musicianInfo(" + i + ")'>" +  list[i].position + "</li> ");
    }
});

function musicianInfo(i){
	$('.content form [name="first"]').val(list[i].name);
}

