APP
.filter('alterRow', function() {
    return function(input, arg, skip) {
        input -= arg-1;
        if (typeof skip == 'undefined') skip = 2;
        return Math.floor(input/skip - 0.001) % 2 ? '' : 'alter';
    };
})
;
