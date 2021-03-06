/* globals Bezier */
/* eslint no-unused-vars: 0, no-console: 0 */
'use strict';

const NODE_COLOR = '#28a86b';
const EDGE_COLOR = '#2244cc';
const NODE_SIZE = 4;

window.onload = function(){
  // point be moving
  let movPoint = null;
  // last mousedown - move point
  let lastMouseX = 0;
  let lastMouseY = 0;
  // last mousedown center - rotate
  let lastCmbX = null;
  let lastCmbY = null;
  // context
  let canvas = null;
  let ctx = null;

  // ctx.fillStyle = NODE_COLOR;
  // ctx.strokeStyle = EDGE_COLOR;

  /************************
    data
  *************************/
  let data = {
  };


  /************************
    model
  *************************/
  let sheer = {
    curve: new Bezier(100,50,0, 400,200,0, 800,50,0),
    // call when point is changed
    update(){
      this.curve.update();
    },
    draw(){
      drawSkeleton(sheer.curve);
      drawCurve(sheer.curve);
    }
  };

  function draw(){
    // ctx.clearRect(0, 0, 1100, 500);
    ctx.clearRect(0, 0, 1600, 800);
    // ctx.drawImage(imageObj, 0, 0);
    // ctx.drawImage(imageObj, 0, 0, 780, 651);
    // ctx.drawImage(imageObj, -50, 0, 1170, 976.5); // Rattylines
    // ctx.drawImage(imageObj, 0, -1100); // flicka20
    // ctx.drawImage(imageObj, 0, 0, 1440, 2560); // 14-foot-sharpie (720x1280)
    ctx.drawImage(imageObj, 0, 0, 1280, 720); // 14-foot-sharpie (1280x720x)
    sheer.draw();
  }


  /************************
    init
  *************************/
  canvas  = document.getElementById("mycanvas");
  if (canvas.getContext){
    ctx = canvas.getContext('2d');
    var imageObj = new Image();
    // imageObj.src = 'img/Rattylines.jpg';
    // imageObj.src = 'img/flicka20-sailplan.gif';
    imageObj.src = 'img/18-foot-sharpie.jpg';

    // ctx.translate(200, 200);
    draw();
  } else {
    alert('no canvas');
     // canvas-unsupported code here
  }


  /************************
    events
  *************************/
  // click
  canvas.addEventListener('click', (event)=>{
    // model.rotateY(.1);
    // model.draw();
    // window.requestAnimationFrame(click);
  });
  // mousedown
  canvas.addEventListener('mousedown', (event)=>{
    // rotation - mid button mouse
    if (event.target.id === 'mycanvas' && event.buttons === 4) {
      lastCmbX = event.clientX;
      lastCmbY = event.clientY;
    }
    // selection - left button mouse
    else if (event.target.id === 'mycanvas' && event.buttons === 1) {
      sheer.curve.points.forEach(p=>{
        if (Math.abs(event.offsetX - p.x) < 5 && Math.abs(event.offsetY - p.y) < 5) {
          movPoint = p;
          lastMouseX = event.offsetX;
          lastMouseY = event.offsetY;
        }
      });
    }
  });
  // mouseup
  canvas.addEventListener('mouseup', (event)=>{
    lastCmbX = lastCmbY = null;
    movPoint = null;
  });
  // mousemove
  canvas.addEventListener('mousemove', (event)=>{
    let mx = event.offsetX;
    let my = event.offsetY;

    // rotate model
    if (lastCmbX !== null) {
      let deltaX = lastCmbX - mx;
      lastCmbX = mx;

      let deltaY = lastCmbY - my;
      lastCmbY = my;

      rotateCurveY(sheer.curve, deltaX/4);
      rotateCurveX(sheer.curve, -deltaY/4);
      sheer.update();
      draw();
    }

    // change cursor
    if (movPoint === null) {
      let found = false;
      // find selected point
      sheer.curve.points.forEach(p=>{
        if (Math.abs(mx - p.x) < 5 && Math.abs(my - p.y) < 5) {
          found = true;
        }
      });
      canvas.style.cursor = found ? 'pointer' : 'default';
    }
    // move point
    else {
      movPoint.x = movPoint.x + mx - lastMouseX;
      movPoint.y = movPoint.y + my - lastMouseY;

      lastMouseX = mx;
      lastMouseY = my;

      sheer.update();
      draw();
    }
  });

  // keydown
  document.addEventListener('keydown', (event)=> {
    // console.log(event);
    if (event.key == 'ArrowUp') {
      rotateCurveX(sheer.curve, -1);
      sheer.update();
      draw();
    }
    else if (event.key == 'ArrowDown') {
      rotateCurveX(sheer.curve, 1);
      sheer.update();
      draw();
    }
    else if (event.key == 'ArrowRight') {
      rotateCurveY(sheer.curve, -1);
      sheer.update();
      draw();
    }
    else if (event.key == 'ArrowLeft') {
      rotateCurveY(sheer.curve, 1);
      sheer.update();
      draw();
    }
  });



  /************************
    draw
  *************************/
  function drawPoint(p, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.arc(p.x + ox, p.y + oy, NODE_SIZE, rad(0), rad(360));
    ctx.stroke();
  }

  function drawPoints(points, offset) {
    offset = offset || { x:0, y:0 };
    points.forEach(function(p) {
      drawCircle(p, 5, offset);
    });
  }

  function drawCircle(p, r, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.arc(p.x + ox, p.y + oy, r, 0, 2*Math.PI);
    ctx.stroke();
  }

  function drawLine(p1, p2, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.moveTo(p1.x + ox,p1.y + oy);
    ctx.lineTo(p2.x + ox,p2.y + oy);
    ctx.stroke();
  }

  function drawSkeleton(curve, offset, nocoords){
    offset = offset || { x:0, y:0 };
    var pts = curve.points;
    ctx.strokeStyle = NODE_COLOR;
    drawLine(pts[0], pts[1], offset);
    if(pts.length === 3) { drawLine(pts[1], pts[2], offset); }
    else {drawLine(pts[2], pts[3], offset); }
    ctx.strokeStyle = "black";
    if(!nocoords) drawPoints(pts, offset);
  }

  function drawCurve(curve, offset) {
    ctx.strokeStyle = EDGE_COLOR;
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    var p = curve.points, i;
    ctx.moveTo(p[0].x + ox, p[0].y + oy);
    if(p.length === 3) {
      ctx.quadraticCurveTo(
        p[1].x + ox, p[1].y + oy,
        p[2].x + ox, p[2].y + oy
      );
    }
    if(p.length === 4) {
      ctx.bezierCurveTo(
        p[1].x + ox, p[1].y + oy,
        p[2].x + ox, p[2].y + oy,
        p[3].x + ox, p[3].y + oy
      );
    }
    ctx.stroke();
    ctx.closePath();
  }



  /************************
    draw plan view
  *************************/
  let planView = {
    drawPoint(p, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, NODE_SIZE, rad(0), rad(360));
      ctx.stroke();
    },

    drawPoints(points, offset) {
      offset = offset || { x:0, y:0 };
      points.forEach(function(p) {
        drawCircle(p, 5, offset);
      });
    },

    drawCircle(p, r, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, r, 0, 2*Math.PI);
      ctx.stroke();
    },

    drawLine(p1, p2, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.moveTo(p1.x + ox,p1.y + oy);
      ctx.lineTo(p2.x + ox,p2.y + oy);
      ctx.stroke();
    },

    drawSkeleton(curve, offset, nocoords){
      offset = offset || { x:0, y:0 };
      var pts = curve.points;
      ctx.strokeStyle = NODE_COLOR;
      drawLine(pts[0], pts[1], offset);
      if(pts.length === 3) { drawLine(pts[1], pts[2], offset); }
      else {drawLine(pts[2], pts[3], offset); }
      ctx.strokeStyle = "yellow";
      if(!nocoords) drawPoints(pts, offset);
    },

    drawCurve(curve, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      var p = curve.points, i;
      ctx.moveTo(p[0].x + ox, p[0].y + oy);
      if(p.length === 3) {
        ctx.quadraticCurveTo(
          p[1].x + ox, p[1].y + oy,
          p[2].x + ox, p[2].y + oy
        );
      }
      if(p.length === 4) {
        ctx.bezierCurveTo(
          p[1].x + ox, p[1].y + oy,
          p[2].x + ox, p[2].y + oy,
          p[3].x + ox, p[3].y + oy
        );
      }
      ctx.stroke();
      ctx.closePath();
    }

  };


  /* **********************
    rotate
  *************************/
  function rotateCurveZ(curve, degree){
    curve.points.forEach(p=>{
      rotateZ(p, degree);
    });
  }

  function rotateCurveY(curve, degree){
    curve.points.forEach(p=>{
      rotateY(p, degree);
    });
  }

  function rotateCurveX(curve, degree){
    curve.points.forEach(p=>{
      rotateX(p, degree);
    });
  }

  function rotateZ(point, degree) {
    let cos_tetha = Math.cos(rad(degree));
    let sin_tetha = Math.sin(rad(degree));
    let x = point.x;
    let y = point.y;
    point.x = x * cos_tetha - y * sin_tetha;
    point.y = y * cos_tetha + x * sin_tetha;
  }

  function rotateY(point, degree) {
    let cos_tetha = Math.cos(rad(degree));
    let sin_tetha = Math.sin(rad(degree));
    let x = point.x;
    let z = point.z;
    point.x = x * cos_tetha - z * sin_tetha;
    point.z = z * cos_tetha + x * sin_tetha;
  }

  function rotateX(point, degree) {
    let cos_tetha = Math.cos(rad(degree));
    let sin_tetha = Math.sin(rad(degree));
    let z = point.z;
    let y = point.y;
    point.z = z * cos_tetha - y * sin_tetha;
    point.y = y * cos_tetha + z * sin_tetha;
  }

  // convert degree to radians
  function rad(degree){
    return (Math.PI/180)*degree;
  }

};
