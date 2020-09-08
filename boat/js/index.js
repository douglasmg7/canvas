/* globals Bezier */
/* eslint no-unused-vars: 0, no-console: 0 */
'use strict';

const NODE_COLOR = '#28a86b';
const EDGE_COLOR = '#2244cc';
const NODE_SIZE = 4;

const canvas  = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Bow.
let bow = {
    top: {
        x: 0,
        y: 700,
    },
    bottom: {
        x: 50,
        y: -50,
    },
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.top.x ,this.top.y);
        ctx.lineTo(this.bottom.x, this.bottom.y);
        ctx.stroke();
    }
}

// Stern.
let stern = {
    top: {
        x: 6000,
        y: 600,
    },
    bottom: {
        x: 5800,
        y: 50,
    },
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.top.x ,this.top.y);
        ctx.lineTo(this.bottom.x, this.bottom.y);
        ctx.stroke();
    }
}

// Bottom.
let bottom = {
    bow: {
        x: bow.bottom.x,
        y: bow.bottom.y,
    },
    stern: {
        x: stern.bottom.x,
        y: stern.bottom.y,
    },
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.bow.x ,this.bow.y);

        ctx.quadraticCurveTo(
            stern.bottom.x/2, -stern.top.y/2,
            this.stern.x, this.stern.y
        );
        ctx.stroke();
    }
}

// Sheer.
let sheer = {
    bow: {
        x: bow.top.x,
        y: bow.top.y,
    },
    stern: {
        x: stern.top.x,
        y: stern.top.y,
    },
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.bow.x ,this.bow.y);

        ctx.quadraticCurveTo(
            stern.top.x/1.7, -stern.top.y/16,
            this.stern.x, this.stern.y
        );
        ctx.stroke();
    }
}

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
        ctx.moveTo(-stern.top.x, 0);
        ctx.lineTo(stern.top.x * 2, 0);
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
    // line_test.draw();
    dwl.draw();
    bow.draw();
    stern.draw();
    sheer.draw();
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
    // Set coordinates.
    ctx.rotate(180 * Math.PI / 180);
    ctx.translate(-canvas.width * .95, -canvas.height * .8);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let scale_factor = canvas.width / (stern.top.x * 1.12);
    ctx.scale(scale_factor, scale_factor);

    ctx.lineWidth = 2 / scale_factor;
    ctx.strokeStyle = '#2244cc';
    draw();
}
