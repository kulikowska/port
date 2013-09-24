$(document).ready( function() {
	
	var list = [ {"name" : "Robbie", "last" : "Robertson", "email" : "Robbie@band.com"};
				 {"name" : "Richard", "last" : "Emmanuel", "email" : "Richard@band.com"};
				 {"name" : "Levon", "last" : "Helm", "email" : "Levon@band.com"};
				 {"name" : "Rick", "last" : "Danko", "email" : "Rick@band.com"};
				 {"name" : "Garth", "last" : "Hudson", "email" : "Garth@band.com"}

		]; 

		for (var i=0; i<list.length; i++){
			$('.menu').append( tags[i].name + tags[i].last + tags[i].email); 
		}
	});
