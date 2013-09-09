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
