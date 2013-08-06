function LG() { console.log( arguments ); }

formData = {};

function getChanged(e) {
    var target = $(e.target);
    switch (target.attr('type')) {
        case 'text' :
        case 'textarea' :
        case 'select' :
            formData[target.attr('name')] = target.val();
            break;
        case 'radio' :
            formData[target.attr('name')] = target.attr('id').substr(1);
            break;
        case 'checkbox' :
            if ( typeof formData[target.attr('name')] == 'undefined' ) 
                formData[target.attr('name')] = [];
            formData[target.attr('name')][(target.attr('id').substr(1))] = target.is(':checked');
            break;
        default : break;
    }
}

function saveFormData(formObject) {
    var fromForm = $(formObject).serializeArray();
    for (var i=0; i<fromForm.length; i++) {
        switch (fromForm[i].name) {
            case 'userType' :
                formData[fromForm[i].name] = $("form input[type='radio']:checked").attr('id').substr(1);
                break;
            case 'userStatus' :
                if (typeof formData.userStatus == 'undefined') {
                    formData.userStatus  = [$("form input[type='checkbox']:checked").attr('id').substr(1)];
                } else {
                    formData.userStatus.push($("form input[type='checkbox']:checked").attr('id').substr(1));
                }
                break;
            default : formData[fromForm[i].name] = fromForm[i].value;
        }
    }
    return false;
}

if (typeof jQuery == 'undefined') {
    LG( 'jquery missing');
} else {
    LG( 'jquery loaded');
}

LG('Loaded js file');
