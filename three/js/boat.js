'use strict'

import * as THREE from './three.module.js'; 

// Render.
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild( renderer.domElement );

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setClearColorHex( 0xffffff, 1 );
renderer.setClearColor(0xffffff)

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
camera.position.set( 0, 0, -2 );
camera.lookAt( 0, 0, 0 );
// camera.position.z = 5;

// Scene.
var scene = new THREE.Scene();

// // Light.
// {
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // scene.add(light);
// }

// Material.
var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// Geometry.
var points = [];
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 1, 1, 0 ) );
var geometry = new THREE.BufferGeometry().setFromPoints( points );

var line = new THREE.Line(geometry, material);

scene.add(line);



// Resize 
// Set internal size (drawing buffer), resolution.
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function render(time) {
    time *= 0.001;  // convert time to seconds

    // Set drawing buffer and aspect rate. 
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
    // cube.rotation.x = time;
    // cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);
