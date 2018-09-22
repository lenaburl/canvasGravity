var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

var gravity = 1,
    friction = 0.8;

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.closePath();
    };

    this.update = function() {

        if (this.y + this.radius + this.dy >= canvas.height - 2) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}

var ball;
function init() {
    var radius = 30,
        x = Math.random() * (innerWidth - radius * 2) + radius,
        y = Math.random() * (innerHeight - radius * 2) + radius,
        dy = Math.random() - 0.5,
        dx = Math.random() - 0.5;
    ball = new Ball(x, y, dx, dy, radius, 'black');
}

init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    ball.update();
}

animate();