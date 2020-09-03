/* globals Bezier */
/* eslint no-unused-vars: 0, no-console: 0 */
'use strict';

const NODE_COLOR = '#28a86b';
const EDGE_COLOR = '#2244cc';
const NODE_SIZE = 4;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const CANVAS_OFFSET_WIDTH = 50;
const CANVAS_OFFSET_HEIGHT = 200;

const canvas  = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// DWL
let dwl = {
  // // ctx.fillStyle = NODE_COLOR;
  // // ctx.strokeStyle = EDGE_COLOR;
    draw(){
        ctx.strokeStyle = '#2244cc';
        ctx.beginPath();
        ctx.moveTo(CANVAS_OFFSET_WIDTH, 0);
        ctx.lineTo(-canvas.width + CANVAS_OFFSET_WIDTH, 0);
        console.log(`canvas.width: ${canvas.width}`);
        // ctx.lineTo(-CANVAS_WIDTH, 0);
        ctx.stroke();
    }
};

let bottom = {
    draw(){
        ctx.strokeStyle = '#2244cc';
        ctx.beginPath();
        ctx.moveTo(0 ,0);
        ctx.lineTo(-300, -300);
        ctx.stroke();
    }
};

if (canvas.getContext){
    // Set 0 position.
    initialize();
} else {
    alert('no canvas');
}

function draw(){
    ctx.clearRect(0, 0, 400, 400);
    dwl.draw();
    bottom.draw();
}

function initialize() {
    // Register an event listener to call the resizeCanvas() function 
    // each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
}

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = '#2244cc';
    ctx.rotate(180 * Math.PI / 180);
    ctx.translate(-800, -600);
    // ctx.translate(ctx.canvas.width - CANVAS_OFFSET_WIDTH, ctx.canvas.height - CANVAS_OFFSET_HEIGHT);
    ctx.beginPath();
    ctx.moveTo(0 ,0);
    ctx.lineTo(300, 300);
    ctx.stroke();
    // draw();
}

window.onload = function(){
    // const canvas  = document.getElementById("mycanvas");
    // if (canvas.getContext){
        // const ctx = canvas.getContext('2d');
        // // ctx.translate(200, 200);
        // draw();
    // } else {
        // alert('no canvas');
    // }

  // [>***********************
    // model
  // *************************/
  // let sheer = {
    // curve: new Bezier(100,50,0, 400,200,0, 800,50,0),
    // // call when point is changed
    // update(){
      // this.curve.update();
    // },
    // draw(){
      // drawSkeleton(sheer.curve);
      // drawCurve(sheer.curve);
    // }
  // };

};
