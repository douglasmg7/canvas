ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = "rgba(0, 0, 200, .5)";
ctx.fillRect(30, 30, 50, 50);

ctx.strokeStyle = "rgb(0, 200, 200)";
ctx.strokeRect(50, 50, 50, 50);

ctx.clearRect(60, 60, 50, 50);

// Filled triangle
ctx.beginPath();
ctx.moveTo(25,25);
ctx.lineTo(105,25);
ctx.lineTo(25,105);
ctx.fill();

// Stroked triangle
ctx.beginPath();
ctx.moveTo(125,125);
ctx.lineTo(125,45);
ctx.lineTo(45,125);
ctx.closePath();
ctx.stroke();

// set transparency value
ctx.globalAlpha = 0.2;

var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
ctx.stroke(p);


var rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);

var circle = new Path2D();
circle.moveTo(125, 35);
circle.arc(100, 35, 25, 0, 2 * Math.PI);

ctx.stroke(rectangle);
ctx.fill(circle);
