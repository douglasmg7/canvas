'use strict'

// import * as THREE from './three.module.js'; 
import * as THREE from '../node_modules/three/build/three.module.js'; 
// import * as dat from '../node_modules/dat.gui/build/dat.gui.module.js'; 
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import {GUI} from '../node_modules/dat.gui/build/dat.gui.module.js'; 

const canvas = document.querySelector('#canvas');
// const renderer = new THREE.WebGLRenderer({canvas});
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});

/*
    Camera.
    Those 4 settings define a "frustum".
    A frustum is the name of a 3d shape that is like a pyramid with the tip sliced off.
    In other words think of the word "frustum" as another 3D shape like sphere, cube, prism, frustum.
*/
// const fov = 95; // Field Of View.
// const aspect = 2;  // the canvas default
// const near = 10;
// const far = 250;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.set( 0, 0, -35 );
// camera.lookAt( 0, 0, 0 );

const size = 10;
const near = 5;
const far = 250;
const camera = new THREE.OrthographicCamera(-size, size, size, -size, near, far);
camera.zoom = 0.1;
camera.position.set(0, 6, -20);

class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
        this.obj = obj;
        this.minProp = minProp;
        this.maxProp = maxProp;
        this.minDif = minDif;
    }
    get min() {
        return this.obj[this.minProp];
    }
    set min(v) {
        this.obj[this.minProp] = v;
        this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }
    get max() {
        return this.obj[this.maxProp];
    }
    set max(v) {
        this.obj[this.maxProp] = v;
        this.min = this.min;  // this will call the min setter
    }
}

const gui = new GUI();
gui.add(camera, 'zoom', 0.01, 1, 0.01).listen();
const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near');
gui.add(minMaxGUIHelper, 'max', 0.1, 250, 0.1).name('far');

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

// Scene.
var scene = new THREE.Scene();
scene.background = new THREE.Color('white');

// Line.
{
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 3 } );
    var points = [];
    points.push( new THREE.Vector3( -100, -100, 0 ) );
    points.push( new THREE.Vector3( 100, 100, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line(geometry, material);
    line.scale.set(.1, .1, .1);
    scene.add(line);
}

// Plane.
// {
    // const planeSize = 40;
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('../img/checker.png');
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.magFilter = THREE.NearestFilter;
    // const repeats = planeSize / 2;
    // texture.repeat.set(repeats, repeats);

    // const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    // const planeMat = new THREE.MeshPhongMaterial({
        // map: texture,
        // side: THREE.DoubleSide,
    // });
    // const mesh = new THREE.Mesh(planeGeo, planeMat);
    // mesh.rotation.x = Math.PI * -.5;
    // scene.add(mesh);
// }

// Cube.
{
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
}

// Sphere.
// {
    // const sphereRadius = 3;
    // const sphereWidthDivisions = 32;
    // const sphereHeightDivisions = 16;
    // const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    // const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
    // const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    // mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    // scene.add(mesh);
// }

// Light.
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
}

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

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // camera.updateProjectionMatrix();
    }
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
