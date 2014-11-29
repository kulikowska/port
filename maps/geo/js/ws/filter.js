APP
.filter('alterRow', function() {
    return function(input, arg, skip) {
        input -= arg-1;
        if (typeof skip == 'undefined') skip = 2;
        return Math.floor(input/skip - 0.001) % 2 ? '' : 'alter';
    };
})
.filter('checkActive', function() {
    return function(input) { return input ? 'active' : ''; };
})
.filter('checkInactive', function() {
    return function(input) { return input ? 'inactive' : ''; };
})
.filter('pushBack', function() {
    return function(input) {
        return input ? 'inactive' : '';
    };
})
.filter('threeWay', function() {
    return function(input) {
        var ret;
        switch(input) {
            case 1: ret = "down"; break;
            case 2: ret = "up"; break;
            default : ret = "noshow"; break;
        }
        return ret;
    };
}) 
