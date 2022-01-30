import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera.position.set(0, 90, 0);
camera.position.set(0, 0, 50);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}

console.log('test');

createRoom();
lighting();

function wall(width, height, depth){
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(width, height, depth), 
        new THREE.MeshLambertMaterial({color: 0xfCCCCCC})
    )

    return wall;
}

function createWalls(){

    const walls = new THREE.Group;
    
    const backWall = new wall(100, 68, 2);
    backWall.position.set(16, 4, -30)
    walls.add(backWall);

    const rightWall = new wall(4, 68, 60);
    rightWall.position.y = 4;
    rightWall.position.x = 64;
    walls.add(rightWall);

    const leftWallSide = new THREE.Group();

    const leftWallBack = new wall(10, 68, 14);
    leftWallBack.position.y = 4;
    leftWallBack.position.z = -24;
    leftWallSide.add(leftWallBack);

    const leftWallBtm = new wall(10, 10, 60);
    leftWallBtm.position.y = -24.8;
    leftWallSide.add(leftWallBtm);

    const leftWallBridge = new wall(2, 2, 60);
    leftWallBridge.position.y = 8;
    leftWallSide.add(leftWallBridge);

    const leftWallFront = new wall(10, 60, 28);
    leftWallFront.position.z = 16;
    leftWallSide.add(leftWallFront);

    const leftWallTop = new wall(10, 10, 60);
    leftWallTop.position.y = 33;
    leftWallSide.add(leftWallTop);

    leftWallSide.position.x = -30;
    walls.add(leftWallSide);

    
    return walls;

}



function createRoom(){
    const room = new THREE.Group;
    const walls = new createWalls();

    walls.position.y = 29.9;
    walls.position.x = -5

    room.add(walls);

    const roof = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(100, 60, 1, 1),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )
    roof.material.side = THREE.DoubleSide;
    roof.position.x = 10;
    roof.position.y = 68;
    roof.rotation.x = 11;
    room.add(roof);

    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(100, 60, 1, 1),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = 11;
    floor.position.x = 10;
    room.add(floor);



    room.position.y = -20;
    scene.add(room);
}

function lighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(200, 500, 300);
    scene.add(directionalLight);  
}

function animate() {

	requestAnimationFrame( animate );
	controls.update();

	renderer.render( scene, camera );

}

animate();