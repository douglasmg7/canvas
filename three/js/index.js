/* global THREE */
let renderer;
let scene;
let camera;

window.onload = init;

function init() {
  scene = new THREE.Scene();
  // renderer = new THREE.WebGLRenderer();
  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth*.8, window.innerHeight*.8);
  renderer.shadowMapEnabled = true;

  camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 15;
  camera.position.y = 16;
  camera.position.z = 13;
  camera.lookAt(scene.position);

  var cubeGeometry = new THREE.CubeGeometry(6, 4, 6);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: "red"
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  scene.add(cube);

  var planeGeometry = new THREE.PlaneGeometry(20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -2;
  scene.add(plane);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 20, 20);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.body.appendChild(renderer.domElement);
  render();
}

var render = function () {

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render(scene, camera);
  // requestAnimationFrame( render );
};
