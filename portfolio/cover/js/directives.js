APP
.directive('mainContent', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.content,
        link: function($scope, $element, $attributes) {
            }
        }
 }])
.directive('canvasTest', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        //templateUrl: 'html/header.html',
        template: TPL.canvasTest,
        link: function($scope, $element, $attributes) {
            var canvas = document.getElementById('testCanvas');

            var requestAnimationFrame = 
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.oRequestAnimateFrame ||
                function(callback) {
                    return setTimeout(callback, 1);
                };

            if (canvas.getContext) {
                var context = canvas.getContext('2d');

                var square = {
                    'x': 50,
                    'y': 50,
                    'width': 100,
                    'height': 100,
                    'fill': '#fff'
                };

                var render = function() {
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    context.beginPath();
                    context.rect(50, 50, 100, 100);
                    context.fillStyle = '#FFF';
                    context.fill();

                    requestAnimationFrame(render);
                };
                render();

                var animate = function(prop, val, duration) {
                    var start = new Date().getTime();
                    var end = start + duration;
                    var current = square[prop];
                    var distance = val - current;

                    var step = function() {
                        var timestamp = new Date().getTime();
                        var progress = Math.min((duration - (end - timestamp)) / duration, 1);

                        square[prop] = current + (distance * progress);
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    return step();
                };
                animate('x', 0, 1000);
            }
        }
    }
 }])
