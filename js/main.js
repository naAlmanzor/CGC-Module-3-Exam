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

camera.position.set(0, 0, 24);
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

function createWalls(){
    
    function wall(width, height, depth){
        const wall = new THREE.Mesh(
            new THREE.BoxBufferGeometry(width, height, depth), 
            new THREE.MeshLambertMaterial({color: 0xfCCCCCC})
        )
    
        return wall;
    }

    const walls = new THREE.Group;
    
    const backWall = new wall(100, 68, 2);
    backWall.position.set(16, 4, -30)
    walls.add(backWall);

    const rightWall = new wall(4, 68, 60);
    rightWall.position.y = 4;
    rightWall.position.x = 64;
    walls.add(rightWall);

    const leftWallSide = new THREE.Group();

    const leftWallBack = new wall(10, 68, 10);
    leftWallBack.position.y = 4;
    leftWallBack.position.z = -26;
    leftWallSide.add(leftWallBack);

    const leftWallBtm = new wall(10, 15, 60);
    leftWallBtm.position.y = -23;
    leftWallSide.add(leftWallBtm);

    const leftWallBridge = new wall(4, 4, 60);
    leftWallBridge.position.x = -2;
    leftWallBridge.position.y = 6;
    leftWallSide.add(leftWallBridge);

    const leftWallFront = new wall(10, 60, 34);
    leftWallFront.position.z = 13;
    leftWallSide.add(leftWallFront);

    const leftWallTop = new wall(10, 20, 60);
    leftWallTop.position.y = 28;
    leftWallSide.add(leftWallTop);

    leftWallSide.position.x = -30;
    walls.add(leftWallSide);

    
    return walls;

}

function createStairs(){
    
    function creatStair(width, height, depth){
        const stair = new THREE.Mesh(
            new THREE.BoxBufferGeometry(width, height, depth),
            new THREE.MeshLambertMaterial({color: 0xBCB0A0})
        )
        
        return stair
    }

    const stairCase = new THREE.Group;
    
    const stairsPad = new creatStair(75, 6, 10)
    stairsPad.position.x = 20;
    stairsPad.position.y = 3.1;
    stairCase.add(stairsPad)

    const longStair = new creatStair(36, 24.2, 10)
    longStair.position.x = 39.2;
    longStair.position.y = 18.4;
    stairCase.add(longStair)

    const stairHandle = new creatStair(26, 0.69, 1)
    stairHandle.rotation.z = 6.9;
    stairHandle.position.x = 3;
    stairHandle.position.y = 28;
    stairHandle.position.z = -3.8;
    stairCase.add(stairHandle)


    function createStairSize(sHeight, lHeight){
        const sStair = new THREE.Group;
        const stairBuildS = new creatStair(4, sHeight, 10)
        sStair.add(stairBuildS)
    
        const stairBuildL = new creatStair(6, lHeight, 10)
        stairBuildL.position.x = -2;
        stairBuildL.position.y = -1.6;
        sStair.add(stairBuildL)

        return sStair;
    }

    const sStairBtm = new createStairSize(6, 3);
    sStairBtm.position.set(-12.5, 3.1, 7);
    sStairBtm.rotation.y = -4.71;
    stairCase.add(sStairBtm);

    const sStairTop = new createStairSize(6, 3);
    sStairTop.position.set(-2.6, 9.3, 0);
    stairCase.add(sStairTop);

    const mStairTop = new createStairSize(12.2, 9);
    mStairTop.position.x = 4.5;
    mStairTop.position.y = 12.4;
    stairCase.add(mStairTop);

    const lStairTop = new createStairSize(18.2, 15);
    lStairTop.position.x = 11.7;
    lStairTop.position.y = 15.4;
    stairCase.add(lStairTop);

    const xlStairTop = new createStairSize(24.2, 21);
    xlStairTop.position.x = 18.91;
    xlStairTop.position.y = 18.4;
    stairCase.add(xlStairTop);

    function createStairGap(width, height, depth){
    
        const stairGap = new THREE.Mesh(new THREE.BoxBufferGeometry(width, height, depth),new THREE.MeshLambertMaterial({color: 0x574a3a}))

        return stairGap;
    }

    const sStairGap = new createStairGap(0.2, 6, 10)
    sStairGap.position.x = -0.5
    sStairGap.position.y = 9.3
    stairCase.add(sStairGap);

    const mStairGap = new createStairGap(0.2, 12.2, 10)
    mStairGap.position.x = 6.6
    mStairGap.position.y = 12.4
    stairCase.add(mStairGap);

    const lStairGap = new createStairGap(0.2, 18.2, 10)
    lStairGap.position.x = 13.8
    lStairGap.position.y = 15.4
    stairCase.add(lStairGap);

    const xlStairGap = new createStairGap(0.2, 24.2, 10)
    xlStairGap.position.x = 21
    xlStairGap.position.y = 18.4
    stairCase.add(xlStairGap);

    const stairPadGap = new createStairGap(66, 0.2, 10)
    stairPadGap.position.x = 25.4
    stairPadGap.position.y = 6.2
    stairCase.add(stairPadGap);

    return stairCase;
}

function createTextures(){
    const textures = new THREE.Group;
    
    const woodTextureBox = new THREE.TextureLoader().load("../assets/textures/box-wood-texture.png");

    const boxTexture = new THREE.Mesh(
        new THREE.BoxBufferGeometry(32, 37.6, 20), new THREE.MeshLambertMaterial({map: woodTextureBox})
    )
    boxTexture.position.x = 42;
    boxTexture.position.z = -10;
    boxTexture.position.y = 19.1;
    textures.add(boxTexture)

    const woodTextureTop = new THREE.TextureLoader().load("../assets/textures/roof-wood-texture.png");

    const topTexture = new THREE.Mesh(
        new THREE.BoxBufferGeometry(32, 14, 60), new THREE.MeshLambertMaterial({    map: woodTextureTop})
    )
    topTexture.position.x = -14;
    topTexture.position.y = 60.8;
    textures.add(topTexture)

    return textures;
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

    const stairs = new createStairs();
    stairs.position.z = -25
    stairs.position.y = 0.09;
    room.add(stairs);

    const textures = new createTextures();
    room.add(textures)

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