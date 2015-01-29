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
        (function() {

            var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

            //Main
            initHeader();
            addListeners();

            function initHeader() {
                width = window.innerWidth;
                height = window.innerHeight;
                target = {x: 0, y: height};

                largeHeader = document.getElementById('large-header');
                largeHeader.style.height = height+'px';

                canvas = document.getElementById('demo-canvas');
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');

                // create particles
                circles = [];
                for(var x = 0; x < width*0.5; x++) {
                    var c = new Circle();
                    circles.push(c);
                }
                animate();
            }
            
            //Event handling
            function addListeners() {
                window.addEventListener('scroll', scrollCheck);
                window.addEventListener('resize', resize);
            }

            function scrollCheck() {
                if(document.body.scrollTop > height) animateHeader = false;
                else animateHeader = true;
            }

            function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                largeHeader.style.height = height+'px';
                canvas.width = width;
                canvas.height = height;
            }

            function animate() {
                if(animateHeader) {
                    ctx.clearRect(0,0,width,height);
                    for(var i in circles) {
                        circles[i].draw();
                    }
                }
                requestAnimationFrame(animate);
            }
               
            // Canvas manipulation
            function Circle() {
                var _this = this;

               // constructor
                (function() {
                    _this.pos = {};
                    init();
                    console.log(_this);
                })();

                function init() {
                    _this.pos.x = Math.random()*width;
                    _this.pos.y = height+Math.random()*100;
                    _this.alpha = 0.1+Math.random()*0.3;
                    _this.scale = 0.1+Math.random()*0.3;
                    _this.velocity = Math.random();
                }

                this.draw = function() {
                    if(_this.alpha <= 0) {
                        init();
                    }
                    _this.pos.y -= _this.velocity;
                    _this.alpha -= 0.0005;
                    ctx.beginPath();
                    ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
                    ctx.fill();
                    };
                }
            })
         }
      }
}])
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
