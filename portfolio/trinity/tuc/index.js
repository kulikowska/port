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

console.log( first + ' ' + last );

// You can also create the same object on one line like this:
myObject = {'first' : 'Jo', 'last' : 'Blo', 'phone' : '555-555-5555', 'email' : 'jo@blo.com'};
console.log( 'Phone is: ' + myObject.phone + ' and email is: ' + myObject['email']);


//Objects allow you to reference their fields by name like 'email' or 'first'
//In arrays you access elements by order (or position)

// Empty array
var myArray = [];

// or initialized array
myArray = ['joe','blo','555-555-5555','joe@blo.com'];

console.log( 'Name is: ' + myArray[0] + ' and phone is: ' + myArray[2]);

//you can change a value of an array like this :
myArray[0] = 'Bill';
console.log( 'After chage name is: ' + myArray[0] + ' and phone is: ' + myArray[2]);

//
// Advanced use of arrays and objects
//

// You can use objects inside arrays and arrays inside objects
var bigObject = { 'like' : ['blue','green'], 'nolike' : ['brown','pink']};

console.log( 'Like them all: ' + bigObject.like );
console.log( 'Sure like this one: ' + bigObject.like[0] );

// Now objects inside arrays
var bigArray = [{'name' : 'Jo'},{}];
