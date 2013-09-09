// Initialize the value in the browser
$(document).ready( function() {
    $('.rate-points .number').text('+' + getRating());
});

function addRating() {
    var currentRating = $('.rate-points .number').text();
    var intRating = parseInt(currentRating);
    intRating += 1;
    $('.rate-points .number').text('+' + intRating);

    // Now save it in your browser memory so you can get it later
    saveRating(intRating);
}

function saveRating( val ) {
    // This saves the value into browser's storage
    localStorage['ratingValue'] = val;
}

function getRating() {
    // If it is the first time there will not be ratingValue defined in localStorage
    if (typeof localStorage['ratingValue'] == 'undefined' ) {
        return 20;
    } else {
        // Get the value of ratingValue from localStorage and return it to whoever called the funciton
        return localStorage['ratingValue'];
    }
}
//=====================================================================================================
//
//
//      OBJECTS AND ARRAYS for later
//
//
//=====================================================================================================
// Objects and arrays
// Create empty object
var myObject = {};

// Add values to the object
// Method 1: object style
myObject.first = 'Jo';
console.log( myObject );

// Method 2: array style (has the same effect)
myObject['last'] = 'Blo';
console.log( myObject );

// This object has two fields named 'first' and 'last'
// To get the value of a particular field you can do this
var first = myObject.first;
// or
var last = myObject['last'];

console.log( 'First and last: ' + first + ' ' + last );
// or
console.log( 'First and last retrieved directly: ' + myObject['first'] + ' ' + myObject.last );

// You can also create an object on one line like this:
myObject = {'first' : 'Jo', 'last' : 'Blo', 'phone' : '555-555-5555', 'email' : 'jo@blo.com'};

console.log( 'Phone is: ' + myObject.phone + ' and email is: ' + myObject['email']);

// Changing values of an object
myObject.email = 'jo@gmail.com';
myObject['phone'] = '123-456-7890';

console.log( 'After change Phone is: ' + myObject.phone + ' and email is: ' + myObject['email']);

//Objects allow you to reference their fields by name like 'email' or 'first'
//In arrays you access elements by order (or position)

console.log( '-' );
console.log( 'ARRAYS' );
console.log( '-' );
// Empty array
var myArray = [];

// or initialized array
myArray = ['joe','blo','555-555-5555','joe@blo.com'];

console.log( 'Name is: ' + myArray[0] + ' and phone is: ' + myArray[2]);

//you can change a value of an array like this :
myArray[0] = 'Bill';
myArray[2] = '123-456-7890';

console.log( 'After chage name is: ' + myArray[0] + ' and phone is: ' + myArray[2]);

//
// Advanced use of arrays and objects
//

// You can use objects inside arrays and arrays inside objects
console.log( '-');
console.log( 'OBJECT OF ARRAYS');
console.log( '-');

var bigObject = { 'like' : ['blue','green'], 'nolike' : ['brown','pink']};

console.log( 'Like them all: ' + bigObject.like );
console.log( 'Sure like this one: ' + bigObject.like[0] );
console.log( 'Fucking hate this one: ' + bigObject.nolike[0] );
console.log( 'Not crazy about this one: ' + bigObject.nolike[1] );

// Now objects inside arrays
console.log( '-');
console.log( 'ARRAY OF OBJECTS');
console.log( '-');

var bigArray = [{'name' : 'Jo'},{'name' : 'Bill', 'email' : 'bill@nothing.com'}];

console.log( bigArray[1]['email']);
console.log( bigArray[0].name);
//
// That's about all for objects and arrays
// It takes a while to get it under your skin, again, practice/play with it is the only way
//
