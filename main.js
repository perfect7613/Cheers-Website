import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);


const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color:0xF3CA28});
const noob = new THREE.Mesh(geometry, material);



scene.add(noob);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);


}

Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const cheersTexture = new THREE.TextureLoader().load('OIP.jpg');
const cheer = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: cheersTexture})
);
scene.add(cheer);

const newTexture = new THREE.TextureLoader().load('newyear.jpg')
const newYear = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: newTexture,normalMap: newTexture,})
);
scene.add(newYear);

newYear.position.z = 20;
newYear.position.setX(-6);

cheer.position.z = -5;
cheer.position.x = 2;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  newYear.rotation.x += 0.05;
  newYear.rotation.y += 0.075;
  newYear.rotation.z += 0.05;

  cheer.rotation.y += 0.01;
  cheer.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  console.log(t);

}

document.body.onscroll = moveCamera;
moveCamera();



function animate(){
  requestAnimationFrame( animate);
  noob.rotation.x += 0.01;
  noob.rotation.y += 0.005;
  noob.rotation.z += 0.01;

  newYear.rotation.x += 0.005;

  //controls.update();



  renderer.render( scene,camera);
}
animate();