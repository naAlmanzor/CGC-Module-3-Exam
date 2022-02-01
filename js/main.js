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

    const leftWallFront = new wall(10, 60, 38);
    leftWallFront.position.z = 11;
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
    
    const stairsPad = new creatStair(75, 6, 14)
    stairsPad.position.x = 14.5;
    stairsPad.position.y = 3.1;
    stairCase.add(stairsPad)

    const longStair = new creatStair(36, 27, 14)
    longStair.position.x = 37.9;
    longStair.position.y = 19.4;
    stairCase.add(longStair)

    const stairHandle = new creatStair(26, 0.69, 1)
    stairHandle.rotation.z = 6.9;
    stairHandle.position.x = 3;
    stairHandle.position.y = 28;
    stairHandle.position.z = -5;
    stairCase.add(stairHandle)

    const stairCaseUpper = new THREE.Group;

    function createStairSize(sHeight, lHeight){
        const sStair = new THREE.Group;
        const stairBuildS = new creatStair(4, sHeight, 14)
        sStair.add(stairBuildS)
    
        const stairBuildL = new creatStair(6, lHeight, 14)
        stairBuildL.position.x = -2;
        stairBuildL.position.y = -1.6;
        sStair.add(stairBuildL)

        return sStair;
    }

    const sStairBtm = new createStairSize(6, 3);
    sStairBtm.position.set(-16, 3.1, 7);
    sStairBtm.rotation.y = -4.71;
    stairCase.add(sStairBtm);

    const sStairTop = new createStairSize(6, 3);
    sStairTop.position.set(-2.6, 9.3, 0);
    stairCaseUpper.add(sStairTop);

    const mStairTop = new createStairSize(12.2, 9);
    mStairTop.position.x = 4.5;
    mStairTop.position.y = 12.4;
    stairCaseUpper.add(mStairTop);

    const lStairTop = new createStairSize(18.2, 15);
    lStairTop.position.x = 11.7;
    lStairTop.position.y = 15.4;
    stairCaseUpper.add(lStairTop);

    const xlStairTop = new createStairSize(24.2, 21);
    xlStairTop.position.x = 18.91;
    xlStairTop.position.y = 18.4;
    stairCaseUpper.add(xlStairTop);

    function createStairGap(width, height, depth){
    
        const stairGap = new THREE.Mesh(new THREE.BoxBufferGeometry(width, height, depth),new THREE.MeshLambertMaterial({color: 0x574a3a}))

        return stairGap;
    }

    const sStairGap = new createStairGap(0.2, 6, 14)
    sStairGap.position.x = -0.5
    sStairGap.position.y = 9.3
    stairCaseUpper.add(sStairGap);

    const mStairGap = new createStairGap(0.2, 12.2, 14)
    mStairGap.position.x = 6.6
    mStairGap.position.y = 12.4
    stairCaseUpper.add(mStairGap);

    const lStairGap = new createStairGap(0.2, 18.2, 14)
    lStairGap.position.x = 13.8
    lStairGap.position.y = 15.4
    stairCaseUpper.add(lStairGap);

    const xlStairGap = new createStairGap(0.2, 24.2, 14)
    xlStairGap.position.x = 21
    xlStairGap.position.y = 18.4
    stairCaseUpper.add(xlStairGap);

    const stairPadGap = new createStairGap(66, 0.2, 14)
    stairPadGap.position.x = 25.4
    stairPadGap.position.y = 6.2
    stairCaseUpper.add(stairPadGap);
    
    stairCaseUpper.position.x = -1.2;

    stairCase.add(stairCaseUpper);

    return stairCase;
}

function createRadiator(){

    function createRadiatorSpot(closer){
        const radiatorSpot = new THREE.Group;

        const height = 9;
        const depth = 12;

        const radiatorSpotW = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, height, depth),
            new THREE.MeshLambertMaterial({color: 0xcccccc})
        )
        radiatorSpot.add(radiatorSpotW)
        
        const check = closer
        if (check!="yes"){
            const radiatorSpotD = new THREE.Mesh(
                new THREE.BoxBufferGeometry(0.1, height, depth),
                new THREE.MeshLambertMaterial({color: 0x22222})
            )
            radiatorSpotD.position.x = 0.6;
            radiatorSpot.add(radiatorSpotD);    
        }
        return radiatorSpot;
    }
    const radiator = new THREE.Group;
    const radiatorPt1 = new createRadiatorSpot();
    radiator.add(radiatorPt1);
    const radiatorPt2 = new createRadiatorSpot();
    radiatorPt2.position.x = 1.2;
    radiator.add(radiatorPt2);
    const radiatorPt3 = new createRadiatorSpot();
    radiatorPt3.position.x = 2.4;
    radiator.add(radiatorPt3);
    const radiatorPt4 = new createRadiatorSpot();
    radiatorPt4.position.x = 3.6;
    radiator.add(radiatorPt4);
    const radiatorCloser =  new createRadiatorSpot("yes");
    radiatorCloser.position.x = 4.8;
    radiator.add(radiatorCloser);

    return radiator;
}

function createChandelier(){
    
    const chandelier = new THREE.Group;
    
    var points = [];
    for ( var deg = 0; deg <= 180; deg += 6 ) {
        var rad = Math.PI * deg / 180;
        var point = new THREE.Vector2( ( 0.72 + .08 * Math.cos( rad ) ) * Math.sin( rad ), - Math.cos( rad ) );
        points.push( point );
    }

    const geometry = new THREE.LatheBufferGeometry( points, 32 );

    const egg = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )
    egg.scale.set(1.9, 1.4, 2); 
    egg.rotateX(60);
    chandelier.add(egg);

    const handler = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.2, 0.2, 10, 32 ), 
        new THREE.MeshLambertMaterial({color: 0x333333})
    )
    handler.position.y = 5;
    handler.position.z = 0;
    chandelier.add(handler);
    return chandelier;
}

function createTextures(){
    const textures = new THREE.Group;
    
    const woodTextureBox = new THREE.TextureLoader().load("../assets/textures/box-wood-texture.png");

    const boxTexture = new THREE.Mesh(
        new THREE.BoxBufferGeometry(32, 37.6, 16), new THREE.MeshLambertMaterial({map: woodTextureBox})
    )
    boxTexture.position.x = 42;
    boxTexture.position.z = -8.6;
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

function createTable(){
    const tableSet = new THREE.Group;

    function build(width, height, depth){
        const tableStand = new THREE.Mesh(
            new THREE.BoxBufferGeometry(width, height, depth),
            new THREE.MeshLambertMaterial({color: 0xED723F})
        )
        
        tableStand.position.y = 2.1;
        return tableStand
    }
    
    function tablePt1(){
        
        const boxGrp = new THREE.Group; 
        
        const vLeft = new build(0.3, 4, 0.2);
        boxGrp.add(vLeft);

        const vRight = new build(0.3, 4, 0.2);
        vRight.position.x =  -12;
        boxGrp.add(vRight);

        const hLeft = new build(12, 0.1, 0.2);
        hLeft.position.set(-6, 4.1, 0);
        boxGrp.add(hLeft);

        const hRight = new build(12, 0.1, 0.2);
        hRight.position.set(-6, 0.1, 0);
        boxGrp.add(hRight);

        const pointGap = new build(1, 0.3, 0.2);
        pointGap.position.set(-11.63, 4.2, 0);
        boxGrp.add(pointGap);

        return boxGrp;
    }

    function tablePt2(){
        const boxGrp = new THREE.Group; 
        
        const vLeft = new build(1, 0.2, 2);
        vLeft.position.y =  4.2;
        boxGrp.add(vLeft);

        const vRight = new build(0.4, 0.2, 2);
        vRight.position.x = -12.4;
        vRight.position.y = 0.4;
        vRight.rotation.z = 0.3;
        boxGrp.add(vRight);

        const hLeft = new build(13, 0.1, 0.2);
        hLeft.position.set(-6, 2.4, 0.8);
        hLeft.rotation.z = 0.3;
        boxGrp.add(hLeft);

        const hRight = new build(13, 0.1, 0.2);
        hRight.position.set(-6, 2.4, -0.8);
        hRight.rotation.z = 0.3;
        boxGrp.add(hRight);

        return boxGrp;
    }

    const glass = new THREE.Mesh(
        new THREE.BoxBufferGeometry(14, 0.1, 4.6),
        new THREE.MeshLambertMaterial({
            color: 0x777777,
            opacity: 0.9,
            transparent: true
        })
    )
    glass.position.y = 4.4
    glass.position.x = -6
    tableSet.add(glass)
    
    const tableStandV = new tablePt1();
    tableSet.add(tableStandV);

    const tableStandH = new tablePt2();
    tableSet.add(tableStandH);

    function createVasePlant(){
        const vaseSet = new THREE.Group;
        
        const vaseCylinder = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(0.9, 0.9, 0.2, 32),
            new THREE.MeshLambertMaterial({color: 0xBCB0A0})
        )
        vaseSet.add(vaseCylinder);

        const vaseInside = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(0.9, 0.9, 0.1, 32),
            new THREE.MeshLambertMaterial({color: 0xBCB0A0})
        )
        vaseSet.add(vaseInside);
        
        function createVase(){
            const vaseGrp = new THREE.Group; 
            const vase = new THREE.Mesh(
                new THREE.CylinderBufferGeometry(0.6, 0.6, 0.2, 32),
                new THREE.MeshLambertMaterial({color: 0xBCB0A0})
            )
            vase.position.y = 0.3
            vaseGrp.add(vase);
            
            const vaseColor = new THREE.Mesh(
                new THREE.CylinderBufferGeometry(0.6, 0.6, 0.5, 32),
                new THREE.MeshLambertMaterial({color: 0xED723F})
            )
            vaseGrp.add(vaseColor);

            return vaseGrp;
        }

        const pottedPlant = new createVase();
        vaseSet.add(pottedPlant)

        return vaseSet;
    }

    const vase = new createVasePlant();
    vase.position.set(-0.6, 4.6, 0)
    tableSet.add(vase);

    function createTab(){
        const drinkTab = new THREE.Group;

        function createSides(width, depth){
            const side = new THREE.Mesh(
                new THREE.BoxBufferGeometry(width, 0.4, depth),
                new THREE.MeshLambertMaterial({color: 0x333333})
            );
            return side;
        }

        const leftSide = new createSides(3, 0.1);
        leftSide.position.z = 0.5
        drinkTab.add(leftSide); 
        const rightSide = new createSides(3, 0.1);
        rightSide.position.z = -0.5
        drinkTab.add(rightSide); 
        const topSide = new createSides(0.1, 1);
        topSide.position.x = 1.5;
        drinkTab.add(topSide); 
        const backSide = new createSides(0.1, 1);
        backSide.position.x = -1.5;
        drinkTab.add(backSide); 

        const bottom = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(3, 1, 1, 1),
            new THREE.MeshLambertMaterial({color: 0x333333})
        )
        bottom.material.side = THREE.DoubleSide;
        bottom.rotation.x = Math.PI/2
        drinkTab.add(bottom)

        return drinkTab;
    }

    const tab = new createTab();
    tab.position.set(-5, 4.6, 0);
    tab.rotation.y = -0.3;
    tableSet.add(tab);

    const cup1 = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(0.3, 0.3, 1, 32),
        new THREE.MeshLambertMaterial({color: 0x555555})
    )
    cup1.position.set(-5.3, 4.9, -0.1)
    tableSet.add(cup1);

    const cup2 = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(0.3, 0.3, 0.4, 32),
        new THREE.MeshLambertMaterial({color: 0x666666})
    )
    cup2.position.set(-6, 4.9, -0.1)
    tableSet.add(cup2);

    return tableSet
}

function createWindowPlant(){
    const windowPlant = new THREE.Group;

    const vaseBtm = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 3, 3),
        new THREE.MeshLambertMaterial({color: 0x888888})
    ) 
    windowPlant.add(vaseBtm);

    const vaseTop = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 1, 3),
        new THREE.MeshLambertMaterial({color: 0xBCB0A0})
    ) 
    vaseTop.position.y = 2;
    windowPlant.add(vaseTop);

    return windowPlant;
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
    stairs.position.z = -23.9   
    stairs.position.y = 0.09;
    room.add(stairs);

    const textures = new createTextures();
    room.add(textures);

    const chandelier = new createChandelier();
    chandelier.position.set(-1, 45, -20);
    room.add(chandelier);

    const radiator = new createRadiator();
    radiator.position.set(-29.5, 7, -14)
    room.add(radiator);

    const smallEggFurniture = new THREE.Group;
    const eggHolder = new THREE.Mesh(
        new THREE.CylinderBufferGeometry( 1.5, 1.5, 0.8, 32 ),
        new THREE.MeshPhongMaterial( {color: 0xED723F} )
    )
    smallEggFurniture.add(eggHolder);
    const smallEgg = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.5, 32, 16),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )
    smallEgg.position.y = 0.5; 
    smallEggFurniture.add(smallEgg);
    room.add(smallEggFurniture);

    smallEggFurniture.rotation.z = -(Math.PI/2)
    smallEggFurniture.position.set(-30, 30, -4)

    const table = new createTable();
    table.position.set(24, 0.5, -15);
    table.scale.set(1.4,1.4,1.4)
    room.add(table)

    const windowPlant = new createWindowPlant();
    windowPlant.position.set(-32, 15, -12)
    room.add(windowPlant);

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