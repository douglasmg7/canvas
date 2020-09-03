'use strict'

import * as THREE from './three.module.js'; 

// Render.
var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

/*
    Camera.
    Those 4 settings define a "frustum".
    A frustum is the name of a 3d shape that is like a pyramid with the tip sliced off.
    In other words think of the word "frustum" as another 3D shape like sphere, cube, prism, frustum.
*/
const fov = 75; // Field Of View.
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Scene.
var scene = new THREE.Scene();

// Geometry.
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// Material.
const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

// Mash.
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

renderer.render( scene, camera );

// var animate = function () {
//    requestAnimationFrame( animate );
//    renderer.render( scene, camera );
//};
// animate();
