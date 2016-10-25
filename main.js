/* eslint no-unused-vars: 0, no-console: 0 */
'use strict';

const NODE_COLOR = '#28a86b';
const EDGE_COLOR = '#2244cc';
const NODE_SIZE = 4;

let model = {};

model.ctx = null;

model.nodes = [];

model.edges = [];

model.draw = function(){
  let ctx = this.ctx;
  ctx.clearRect(-200, -200, 400, 400);
  ctx.beginPath();
  ctx.strokeStyle = EDGE_COLOR;
  for(let edge of this.edges){
    ctx.moveTo(this.nodes[edge[0]].x, this.nodes[edge[0]].y);
    ctx.lineTo(this.nodes[edge[1]].x, this.nodes[edge[1]].y);
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = NODE_COLOR;
  for(let node of this.nodes){
    ctx.moveTo(node.x, node.y);
    ctx.arc(node.x, node.y, NODE_SIZE, rad(0), rad(360));
  }
  ctx.fill();
};

model.rotate = function(degree){
  for(let node of this.nodes){
    rotate.z(node, degree);
    rotate.y(node, degree);
    rotate.x(node, degree);
  }
};

// nodes
model.nodes.push({x: -100, y: -100, z: -100});
model.nodes.push({x: -100, y: -100, z:  100});
model.nodes.push({x: -100, y:  100, z: -100});
model.nodes.push({x: -100, y:  100, z:  100});
model.nodes.push({x:  100, y: -100, z: -100});
model.nodes.push({x:  100, y: -100, z:  100});
model.nodes.push({x:  100, y:  100, z: -100});
model.nodes.push({x:  100, y:  100, z:  100});
// edges
model.edges.push([0, 1]);
model.edges.push([1, 3]);
model.edges.push([3, 2]);
model.edges.push([2, 0]);
model.edges.push([4, 5]);
model.edges.push([5, 7]);
model.edges.push([7, 6]);
model.edges.push([6, 4]);
model.edges.push([0, 4]);
model.edges.push([1, 5]);
model.edges.push([2, 6]);
model.edges.push([3, 7]);

function draw(){
  let canvas  = document.getElementById("mycanvas");
  if (canvas.getContext){
    model.ctx = canvas.getContext('2d');
    // canvas.addEventListener('click', click, false);
    model.ctx.translate(200, 200);

    // model.rotate(30);
    model.draw();
  } else {
    alert('no canvas');
     // canvas-unsupported code here
  }
}

function click(){
  model.rotate(.1);
  model.draw();
  window.requestAnimationFrame(click);
}

let rotate = {};
rotate.z = function(node, degree) {
  let cos_tetha = Math.cos(rad(degree));
  let sin_tetha = Math.sin(rad(degree));
  let x = node.x;
  let y = node.y;
  node.x = x * cos_tetha - y * sin_tetha;
  node.y = y * cos_tetha + x * sin_tetha;
};
rotate.y = function(node, degree) {
  let cos_tetha = Math.cos(rad(degree));
  let sin_tetha = Math.sin(rad(degree));
  let x = node.x;
  let z = node.z;
  node.x = x * cos_tetha - z * sin_tetha;
  node.z = z * cos_tetha + x * sin_tetha;
};
rotate.x = function(node, degree) {
  let cos_tetha = Math.cos(rad(degree));
  let sin_tetha = Math.sin(rad(degree));
  let z = node.z;
  let y = node.y;
  node.z = z * cos_tetha - y * sin_tetha;
  node.y = y * cos_tetha + z * sin_tetha;
};
// convert degree to radians
function rad(degree){
  return (Math.PI/180)*degree;
}
