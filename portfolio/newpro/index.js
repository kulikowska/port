$(document).ready( function() {
	
	var list = [ {"position" : "Guitarist", "name" : "Robbie", "last" : "Robertson", "email" : "Robbie@band.com"},
				 {"position" : "Pianist", "name" : "Richard", "last" : "Emmanuel", "email" : "Richard@band.com"},
				 {"position" : "Drummer", "name" : "Levon", "last" : "Helm", "email" : "Levon@band.com"},
				 {"position" : "Bassist", "name" : "Rick", "last" : "Danko", "email" : "Rick@band.com"},
				 {"position" : "Organist", "name" : "Garth", "last" : "Hudson", "email" : "Garth@band.com"}
    ]; 

    for (var i=0; i<list.length; i++){
        $('.content').append( "<li>" +  list[i].name + list[i].last + list[i].email + "</li>" ); 
    }

    for (var i=0; i<list.length; i++){
        $('.menu').append("<li>" +  list[i].position + "</li> ");
    }
});
