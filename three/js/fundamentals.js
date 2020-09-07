'use strict'

import * as THREE from './three.module.js'; 

// Render.
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild( renderer.domElement );

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas});

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

// Light.
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

// Geometry.
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// Material.
// Not affected by lights.
// const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

// Mash.
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

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
    
    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);
