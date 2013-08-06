function LG(arg) {
    console.log( arg );
}

function saveFormData(formObject) {
    return false;
}

if (typeof jQuery == 'undefined') {
    LG( 'jquery missing');
} else {
    LG( 'jquery loaded');
}

LG('Loaded js file');
