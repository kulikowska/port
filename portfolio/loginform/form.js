// Now that you understand scoing you can use dataObj inside each function
// Notice that dataObj is not available now in the global scope
// This is a good thing because it is impossible to change the value of dataObj
// outside of its intended scope.
// This is know as preventing scoping polution.
//
// Below is a version that brakes down everything into chunks that are easier to understand
//
$(document).ready( function() {
    var dataObj = JSON.parse(localStorage['ourData']);
    if ( typeof dataObj == 'object' ) {
        $('form [name="first"]').val(dataObj.first);
        $('form [name="last"]').val(dataObj.last);
        $('form [name="email"]').val(dataObj.email);
    }
});

function saveform() {
    var dataObj = {
        "first" : $('form [name="first"]').val(),
        "last"  : $('form .last').val(),
        "email" : $('form #email').val()
    };
    localStorage['ourData'] = JSON.stringify(dataObj);
}
//
//   The acutal code ENDS HERE the rest is an explaination and some very advanced JS syntax stuff
//
//if (false) {  //This means the the following code will not be executed
if (true) {  //This means the the following code will not be executed
    $(document).ready( function() {
        // First access local storage and get 'ourData' item of localStorage
        var storedData = localStorage['ourData'];
        // Local storage can only store strings.  We are storing an object that was earlier converted
        // to a string.  We need to convert it back to an object.
        var convertedBackToObject = JSON.parse(storedData);
        // Now we get the string that is First Name from the object we just converted
        var firstName = convertedBackToObject.first;
        // Finally we need to write the value of the First Name into the input form that corresponds
        // to the first name.
        // We use jQuery with selector 'form [name="first"]' to get access to the object that controls
        // that particular input element by calling
        // $('form [name="first"]') - this will return an object that has bunch of functions
        // associate with it (jQuery magic :)).
        var jQobjectForInputNameFirst = $('form [name="first"]');
        // This object has function val().  This function will retrieve the current value of the
        // input field if we call it without parameters.  But if we give it a string as a parameter
        // then it will write that string into the input field.
        jQobjectForInputNameFirst.val(firstName);
        // That's all, we just got the value from local storage and put it inside the input field
    });

    function saveform() {
        // Use jQuery to pull data from form fields using .val() function witout parameters
        var firstName = $('form [name="first"]').val();
        var lastName  = $('form [name="last"]').val();
        var email     = $('form [name="email"]').val();

        // Now that we have all the values we pulled from the form we can build data object that
        // will keep form data in one place
        var dataObj = { "first" : firstName, "last"  : lastName, "email" : email };
        // or we can just assign them one by one like this:
        var dataObj = {};
        dataObj.first = firstName;
        dataObj.last  = lastName;
        dataObj.email = email;
        // The two methods of creating data object are equivalent.

        // Now we need to save this object into localStorage so that the next time
        // we start the browser we can access data we stored eariler.
        // The problem is that localStorage can only store strings and we need to store an object
        // So, first we need to convert our data object to a string using JSON method 'stringify'
        var convertedObject = JSON.stringify(dataObj);
        // Now that we have a string that represents our object we can write it directly
        // into local storage
        console.log( [convertedObject, JSON.stringify(dataObj), dataObj]);
        localStorage['ourData'] = convertedObject;
    }









    // WARNING:  This is VERY ADVANCED - seriously no need to rush this one but you should probably 
    // glance over it to see that there is a perfectly good explanation for making calls like this:
    // JSON.parse('...');
    //
    // Functions can return values:
    function someFunc() {
        return 'I am returning this string so you can see it in the console log';
    }
    console.log( someFunc() );
    // or
    var heyFunctionReturnMeSomeValue = someFunc();
    console.log(heyFunctionReturnMeSomeValue);
    //
    // But this value doesn't have to be a string
    //
    function populateObject( first, last ) {
        var returnObj = {};
        returnObj.first = first;
        returnObj.last  = last;
        return returnObj;
    }

    var nameObject = populateObject('Jo', 'Blo');

    console.log(nameObject);

    //
    //
    // FUNCTIONS AS OBJECT ITEMS.
    //
    //
    // Normally we define functions like this:
    function logArgument(argument) {
        console.log(argument);
    }
    // and call it like this
    logArgument('Jo');

    // We can define the same function as follows:
    var logArgument = function(argument) {
        console.log(argument);
    }
    // and call it the same way
    logArgument('Jo');

    // From this we see that Javascript thinks of functions the same way as it thinks of regular
    // variables when you define it as in the second case.
    // 
    // But we also use object items as variables like we did in the case of 'dataObj.first'
    var dataObj = {
        'first' : 'Joe',
        'second' : 'Cocker'
    }
    // And access object items as we did above:
    console.log( dataObj.first );

    // So, we can define functions the same way, i.e. inside an object
    FuncObject = {
        'myFunc1' : function( arg ) {
            console.log( arg + ' in myFunc1' );
        },
        'myFunc2' : function(arg) {
            console.log( arg + ' in myFunc2' );
        }
    }
    // So, now a small matter of how we would call these functions.
    // We access those functions as we would any object item.
    // Except that now those items are functions so we can pass them arguments:
    FuncObject.myFunc1('some stuff I want to write to console');
    // or not 
    FuncObject.myFunc1();

    // That is how we call jQuery and JSON functions. They are defined inside an object somehow.
    // Think of a JSON object.  
    // It has two methods (that is usually what we call functions that are members of objects).
    myJSON = {
        'parse' : function(someString) {
            // ... do some coding to covert sting to an object and return that object
        },
        'stringify' : function(someString) {
            // ... do some coding to covert object to a string and return that string
       }
    }
    // Then we can call a function from inside a json object like we did above.
    var someObject = {"first" : "Jo", "last" : "dunnoYet"};
    someObject.last = 'Blo';

    myJSON.stringify( someObject );

    // 
    // If you are actually insane enough to get to this point here are a couple of good ones
    //
    FuncObj = {
        'count' : 0,
        'getCount' : function() {
            return this.count;
        }
    };

    FuncObj.trimSpaces = function(inString) {
        this.count++;
        return inString.trim() 
    }

    console.log( FuncObj.trimSpaces('    a string with leading and trailing spaces we don`t need           ') );
    console.log( FuncObj.trimSpaces('    another  string with leading and trailing spaces we don`t need           ') );
    console.log( FuncObj.trimSpaces('    and one more string with leading and trailing spaces we don`t need           ') );
    console.log( 'Function FuncObj.trimSpaces was called ' +  FuncObj.getCount() + ' times');
}
