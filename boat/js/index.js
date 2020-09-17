/* globals Bezier */
/* eslint no-unused-vars: 0, no-console: 0 */
'use strict';

// const math = require('mathjs');
// const math = require('../node_modules/mathjs/dist/math.js');

const NODE_COLOR = '#28a86b';
const EDGE_COLOR = '#2244cc';
const NODE_SIZE = 4;

const canvas  = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Convert degree to radians.
function rad(degree){
    return (Math.PI/180)*degree;
}

class Point {
    constructor(p=[0, 0, 0]) {
        this.x = p[0];
        this.y = p[1];
        this.z = p[2];
    }
    drawXY() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, 20, rad(0), rad(360));
        ctx.fill();
    }
    log() {
        console.log(`[${this.x}, ${this.y}, ${this.z}]`);
    }
}

class Line {
    constructor(sp=[0, 0, 0], ep=[0, 0, 0]) {
        this.startPoint = new Point(sp);
        this.endPoint = new Point(ep);
    }
    drawXY() {
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x ,this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();
    }
    drawStartPointXY() {
        this.startPoint.drawXY();
    }
    drawEndPointXY() {
        this.endPoint.drawXY();
    }
    drawPointsXY() {
        this.drawStartPointXY();
        this.drawEndPointXY();
    }
    log() {
        console.log(`[${JSON.stringify(this.startPoint, null, 2)}, ${JSON.stringify(this.endPoint, null, 2)}]`);
    }
}

class Curve extends Line {
    constructor(sp=[0, 0, 0], cp=[0, 0, 0], ep=[0, 0, 0]) {
        super(sp, ep);
        this.controlPoint = new Point(cp);
    }
    drawXY() {
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x ,this.startPoint.y);
        ctx.quadraticCurveTo(
            this.controlPoint.x, this.controlPoint.y,
            this.endPoint.x, this.endPoint.y
        );
        ctx.stroke();
    }
    drawControlPointXY() {
        this.controlPoint.drawXY();
    }
    drawPointsXY() {
        super.drawPointsXY();
        this.drawControlPointXY();
    }
    log() {
        console.log(`[${JSON.stringify(this.startPoint, null, 2)}, ${JSON.stringify(this.controlPoint, null, 2)}, ${JSON.stringify(this.endPoint, null, 2)}]`);
    }
}

function getIntersection() {
    // return math.sqrt(16).toString()
    return math.intersect(
        [dwl.startPoint.x, dwl.startPoint.y],
        [dwl.endPoint.x, dwl.endPoint.y],
        [bow.startPoint.x, bow.startPoint.y],
        [bow.endPoint.x, bow.endPoint.y]
    );
    // return math.intersect( [-6000, 0, 0], [12000, 0, 0], [50, -50, 0], [0, 700, 0]);
    // return math.intersect( [-6000, 0], [12000, 0], [50, -50], [0, 700]);
}

// Sheer.
let sheer = new Curve([0, 700, 0], [3100, 300, 0], [6000, 600, 0]);
// Bottom.
let bottom = new Curve([50, -50, 0], [3000, -200, 0], [5800, 50, 0]);
// Bow.
let bow = new Line();
bow.startPoint = bottom.startPoint;
bow.endPoint = sheer.startPoint;
// Stern.
let stern = new Line();
stern.startPoint = bottom.endPoint;
stern.endPoint = sheer.endPoint;
// DWL.
let dwl = new Line([.2*-sheer.endPoint.x, 0, 0], [1.1*sheer.endPoint.x, 0, 0]);

if (canvas.getContext){
    // Set 0 position.
    initialize();
} else {
    alert('no canvas');
}

function drawXY(){
    dwl.drawXY();
    bow.drawXY();
    stern.drawXY();
    sheer.drawXY();
    bottom.drawXY();

    console.log(`intersetcion: ${getIntersection()}`);

    let point = getIntersection();
    ctx.beginPath();
    ctx.moveTo(point[0], point[1]);
    ctx.arc(point[0], point[1], 20, rad(0), rad(360));
    ctx.fill();
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

    let scale_factor = canvas.width / (stern.endPoint.x * 1.12);
    ctx.scale(scale_factor, scale_factor);

    ctx.lineWidth = 2 / scale_factor;
    ctx.strokeStyle = '#2244cc';
    drawXY();
}
