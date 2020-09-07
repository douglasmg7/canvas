/* globals Bezier */
/* eslint no-unused-vars: 0, no-console: 0 */
'use strict';

const NODE_COLOR = '#28a86b';
const EDGE_COLOR = '#2244cc';
const NODE_SIZE = 4;
const CANVAS_OFFSET_WIDTH = 50;
const CANVAS_OFFSET_HEIGHT = 200;

const canvas  = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Line test.
let line_test = {
    draw(){
        ctx.beginPath();
        ctx.moveTo(0 ,0);
        ctx.lineTo(400, 300);
        ctx.stroke();
    }
};

// DWL
let dwl = {
    draw(){
        ctx.strokeStyle = '#2244cc';
        ctx.beginPath();
        ctx.moveTo(-CANVAS_OFFSET_WIDTH, 0);
        ctx.lineTo(canvas.width - CANVAS_OFFSET_WIDTH, 0);
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
    dwl.draw();
    line_test.draw();
    // bottom.draw();
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
    // Set coordinates.
    ctx.rotate(180 * Math.PI / 180);
    console.log(`canvas heigh: ${canvas.height}`);
    ctx.translate(CANVAS_OFFSET_WIDTH - canvas.width, CANVAS_OFFSET_HEIGHT - canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}
