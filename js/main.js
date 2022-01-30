import * as THREE from './three.module.js';

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
camera.position.set(0, 48, 50);
camera.lookAt(0, 0, 0);

console.log('test');

createRoom();
lighting();

function wall(width, height, depth){
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(width, height, depth), 
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )

    return wall;
}

function createWalls(){

    const walls = new THREE.Group;
    
    const backWall = new wall(60, 40, 2);
    backWall.position.z = -20;
    walls.add(backWall);

    const rightWall = new wall(2, 40, 40);
    rightWall.position.x = 29;
    walls.add(rightWall);

    const leftWallSide = new THREE.Group();

    const leftWallBack = new wall(10, 40, 6);
    leftWallBack.position.z = -16;
    leftWallSide.add(leftWallBack);

    const leftWallBtm = new wall(10, 10, 40);
    leftWallBtm.position.y = -15;
    leftWallSide.add(leftWallBtm);

    const leftWallBridge = new wall(2, 2, 40);
    leftWallBridge.position.y = 8;
    leftWallSide.add(leftWallBridge);

    const leftWallFront = new wall(10, 40, 16);
    leftWallFront.position.z = 12;
    leftWallSide.add(leftWallFront);

    const leftWallTop = new wall(10, 4, 40);
    leftWallTop.position.y = 18;
    leftWallSide.add(leftWallTop);

    leftWallSide.position.x = -25;
    walls.add(leftWallSide);

    return walls;

}

function createRoom(){
    const room = new THREE.Group;
    const walls = new createWalls();

    walls.position.y = 20;

    room.add(walls);

    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(60, 40, 1, 1),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = 11;
    room.add(floor);

    scene.add(room);
}

function lighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(200, 500, 300);
    scene.add(directionalLight);  
}

renderer.render(scene, camera);