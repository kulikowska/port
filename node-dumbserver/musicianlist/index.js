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
	$('.formcontent').hide();
});

function setMenu() {
    $('.menu').html('').hide();
    for (var i=0; i<list.length; i++){
        if ( list[i] != null ) {
            $('.menu').append("<li onClick='musicianInfo(this)' musicianId='" + i +  "'>" +
                list[i].position + "</li> ");
        }
    }
    $('.menu').fadeIn(600);
}

var wrapper = 'form .formcontent';

function musicianInfo(el){
	$('.formcontent').fadeIn(600);
	$('.formcontent #fields input').removeClass('funky');
    console.log(el);
	//$('.menu li').removeClass('selected');
	$(el).parent().find('>li').removeClass('selected');
    var i = $(el).attr('musicianid');
	currentMusicianId = i;
	$(el).addClass('selected');
	$(wrapper + ' [name="position"]').val(list[i].position);
	$(wrapper + ' [name="first"]').val(list[i].name);
	$(wrapper + ' [name="last"]').val(list[i].last);
	$(wrapper + ' [name="email"]').val(list[i].email);
}

function clearfield(dontClear){
	$('.formcontent #fields input').removeClass('funky');

    var doClearing = function() {
        $(wrapper + ' [name="position"]').val('');
        $(wrapper + ' [name="first"]').val('');
        $(wrapper + ' [name="last"]').val('');
        $(wrapper + ' [name="email"]').val('');
    }
	
    if (typeof dontClear === 'undefined') doClearing();
}

function clearnotify(){
	$('.notifications >*').hide();
	$('.cleared').addClass('clearbox').text('Cleared').fadeIn(600);

	clearfield();
}

function savefield(){
	$('.notifications >*').hide();
	$('.saved').addClass('savebox').text('Saved').fadeIn(600);

	var i = currentMusicianId;
	
	list[i].name = $(wrapper + ' [name="first"]').val();
	list[i].last = $(wrapper + ' [name="last"]').val();
	list[i].email = $(wrapper + ' [name="email"]').val();
	
	localStorage['musicianStorage'] = JSON.stringify(list);
}
	

var fields = ['position', 'first', 'last', 'email'];
function savefieldDfferent(){
    for (var i=1; i<fields.length; i++) {
	    list[currentMusicianId].name  = $(wrapper + ' [name="' + fields[i] + '"]').val();
    }
    /*
	list[currentMusicianId].name  = $(wrapper + ' [name="first"]').val();
	list[currentMusicianId].last  = $(wrapper + ' [name="last"]').val();
	list[currentMusicianId].email = $(wrapper + ' [name="email"]').val();
    */
}

function addfield (){
	$('.notifications >*').hide();
	$('.added').addClass('addbox').text('Added').fadeIn(600);

	var newList = {};
	newList.position=$(wrapper + ' [name="position"]').val();
	newList.name=$(wrapper + ' [name="first"]').val();
	newList.last=$(wrapper + ' [name="last"]').val();
	newList.email=$(wrapper + ' [name="email"]').val();
	list.push( newList);
	localStorage['musicianStorage'] = JSON.stringify(list);
    setMenu();
}

function del() {
	$('.notifications >*').hide();
	$('.deleted').addClass('delbox').text('Deleted').fadeIn(600);

    delete list[currentMusicianId];
	localStorage['musicianStorage'] = JSON.stringify(list);
    clearfield();
    setMenu();
}

function funkyStyle(el) {
	$('.formcontent #fields input').removeClass('funky');
	$(el).addClass('funky');
}
