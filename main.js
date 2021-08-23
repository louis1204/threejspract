import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
// camera.position.setY(50);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const geo = new THREE.BoxGeometry();
const cube = new THREE.Mesh( geo, material );
scene.add(cube);

const pointLight = new THREE.PointLight(0x323232);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xdddddd);
scene.add(pointLight);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  cube.rotation.x -= 0.01;
  cube.rotation.y -= 0.005;
  cube.rotation.z -= 0.01;

  controls.update();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

animate();