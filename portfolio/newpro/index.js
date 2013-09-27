var currentMusicianId = -1;
if ( typeof localStorage['musicianStorage'] == 'undefined' ) {
    var list = [    {"position" : "Guitarist", "name" : "Robbie", "last" : "Robertson", "email" : "Robbie@band.com"},
                    {"position" : "Pianist", "name" : "Richard", "last" : "Emmanuel", "email" : "Richard@band.com"},
                    {"position" : "Drummer", "name" : "Levon", "last" : "Helm", "email" : "Levon@band.com"},
                    {"position" : "Bassist", "name" : "Rick", "last" : "Danko", "email" : "Rick@band.com"},
                    {"position" : "Organist", "name" : "Garth", "last" : "Hudson", "email" : "Garth@band.com"}
    ]; 
} else {
    var list = JSON.parse(localStorage['musicianStorage']);
}

var listO = { 'a' : {"position" : "Guitarist", "name" : "Robbie", "last" : "Robertson", "email" : "Robbie@band.com"},
	          'b' : {"position" : "Pianist", "name" : "Richard", "last" : "Emmanuel", "email" : "Richard@band.com"},
			  'c' : {"position" : "Drummer", "name" : "Levon", "last" : "Helm", "email" : "Levon@band.com"},
			  'd' : {"position" : "Bassist", "name" : "Rick", "last" : "Danko", "email" : "Rick@band.com"},
			  'e' : {"position" : "Organist", "name" : "Garth", "last" : "Hudson", "email" : "Garth@band.com"}
}; 

$(document).ready( function() {
    console.log(localStorage);
    setMenu();
});

function setMenu() {
    $('.menu').html('');
    for (var i=0; i<list.length; i++){
        if ( list[i] != null ) {
            $('.menu').append("<li onClick='musicianInfo(" + i + ")'>" +  list[i].position + "</li> ");
        }
    }
}

function musicianInfo(i){
    currentMusicianId = i;
	$('.content form [name="first"]').val(list[i].name);
	$('.content form [name="last"]').val(list[i].last);
	$('.content form [name="email"]').val(list[i].email);
}

function clearfield(){
	$('.content form [name="first"]').val('');
	$('.content form [name="last"]').val('');
	$('.content form [name="email"]').val('');
}

function savefield(){
	var i = currentMusicianId;
	var first=$('.content form [name="first"]').val();
		list[i].name = first;
	var last=$('.content form [name="last"]').val();
		list[i].last = last;
	var email=$('.content form [name="email"]').val();
		list[i].email = email;
	
	localStorage['musicianStorage'] = JSON.stringify(list);
}

function savefieldDfferent(){
	
	list[currentMusicianId].name  = $('.content form [name="first"]').val();
	list[currentMusicianId].last  = $('.content form [name="last"]').val();
	list[currentMusicianId].email = $('.content form [name="email"]').val();
}

function addfield (){
	var newList = {};
	newList.position=$('.content form [name="position"]').val();
	newList.name=$('.content form [name="first"]').val();
	newList.last=$('.content form [name="last"]').val();
	newList.email=$('.content form [name="email"]').val();
	list.push( newList);
	localStorage['musicianStorage'] = JSON.stringify(list);
	//document.location = document.location
    setMenu();
}

function del() {
    delete list[currentMusicianId];
	localStorage['musicianStorage'] = JSON.stringify(list);
//	document.location = document.location
    clearfield();
    setMenu();
}
