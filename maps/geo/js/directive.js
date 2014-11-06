APP
.directive('whitespace', [function() {
    return {
        restrict: 'E',
        replace:false,
        //scope: {choices : "=", chosen: '='},
        template:
            '<div id="container">' +
                '<div id="left"> left</div>' +
                '<div id="contentMenu"></div>' +
                '<div id="content"></div>' +
                '<div id="right"> right</div>' +
            '</div>' +
            '<div id="footer">foot' +
                '<div id="panel">' +
                  '<input id="address" type="textbox" value="Sydney, NSW">' +
                  '<input type="button" value="Locate on Map" onclick="codeAddress()">' +
                '</div>' +
            '</div>',
        link: function($scope, $element, $attributes) {}
    }
}])
;
