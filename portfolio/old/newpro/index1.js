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
    FormActions.setMenu();
	$('.formcontent').hide();
});


var FormActions = {
    'fields' : ['position', 'first', 'last', 'email'],
    'wrapper' : 'form .formcontent',

    'setMenu' : function() {
        $('.menu').html('').hide();
        for (var i=0; i<list.length; i++){
            if ( list[i] != null ) {
                $('.menu').append("<li onClick='FormActions.musicianInfo(this)' musicianId='" + i +  "'>" +
                    list[i].position + "</li> ");
            }
        }
        $('.menu').fadeIn(600);
    },

    'musicianInfo' : function(el){
        $('.formcontent').fadeIn(600);
        $('.formcontent #fields input').removeClass('funky');
        console.log(el);
        //$('.menu li').removeClass('selected');
        $(el).parent().find('>li').removeClass('selected');
        var i = $(el).attr('musicianid');
        currentMusicianId = i;
        $(el).addClass('selected');
        $(this.wrapper + ' [name="position"]').val(list[i].position);
        $(this.wrapper + ' [name="first"]').val(list[i].name);
        $(this.wrapper + ' [name="last"]').val(list[i].last);
        $(this.wrapper + ' [name="email"]').val(list[i].email);
    },

    'clearfield' : function(){
        $('.formcontent #fields input').removeClass('funky');
        $(this.wrapper + ' [name="position"]').val('');
        $(this.wrapper + ' [name="first"]').val('');
        $(this.wrapper + ' [name="last"]').val('');
        $(this.wrapper + ' [name="email"]').val('');
    },

    'savefield' :function(){
        $('.added').hide();
        $('.saved').addClass('savebox').text('Saved').fadeIn(600);

        var i = currentMusicianId;
        
        list[i].name = $(this.wrapper + ' [name="first"]').val();

        var last=$(this.wrapper + ' [name="last"]').val();
            list[i].last = last;
        var email=$(this.wrapper + ' [name="email"]').val();
            list[i].email = email;
        
        localStorage['musicianStorage'] = JSON.stringify(list);
    },

    'savefieldDfferent' : function(){
        for (var i=1; i<fields.length; i++) {
            list[currentMusicianId].name  = $(this.wrapper + ' [name="' + this.fields[i] + '"]').val();
        }
        /*
        list[currentMusicianId].name  = $(this.wrapper + ' [name="first"]').val();
        list[currentMusicianId].last  = $(this.wrapper + ' [name="last"]').val();
        list[currentMusicianId].email = $(this.wrapper + ' [name="email"]').val();
        */
    },

    'addfield' : function() {
        $('.saved').hide();
        $('.added').addClass('addbox').text('Added').fadeIn(600);

        var newList = {};
        newList.position=$(this.wrapper + ' [name="position"]').val();
        newList.name=$(this.wrapper + ' [name="first"]').val();
        newList.last=$(this.wrapper + ' [name="last"]').val();
        newList.email=$(this.wrapper + ' [name="email"]').val();
        list.push( newList);
        localStorage['musicianStorage'] = JSON.stringify(list);
        this.setMenu();
    },

    'del' : function() {
        delete list[currentMusicianId];
        localStorage['musicianStorage'] = JSON.stringify(list);
        this.clearfield();
        this.setMenu();
    },

    'funkyStyle' : function(el) {
        $('.formcontent #fields input').removeClass('funky');
        $(el).addClass('funky');
    }
}
