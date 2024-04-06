import { moveBall, shootBall } from "./dribble.js";
let B = BABYLON;

let canvas = document.getElementById("renderCanvas");

let engine = new B.Engine(canvas, true);

let ball = undefined
let ballAnimationGroup = undefined

let createScene = function () {

    let scene = new B.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.98, 0);
    scene.collisionsEnabled = true;

    addLightAndCamera(scene)
    addGround(scene)
    addSkybox(scene)

    let post1 = B.Mesh.CreateCylinder("cylinder", 50, 3, 3, 20, 1, scene, false)
    post1.position = new B.Vector3(20, 0, -95);

    let post2 = B.Mesh.CreateCylinder("cylinder", 50, 3, 3, 20, 1, scene, false)
    post2.position = new B.Vector3(-20, 0, -95);

    let post3 = B.Mesh.CreateCylinder("cylinder", 50, 3, 3, 20, 1, scene, false)
    post3.rotation.z = Math.PI /2
    post3.position = new B.Vector3(0, 26, -95);

    ball = B.Mesh.CreateSphere("sphere", 20.0, 8.0, scene);
    ball.position.y = 2
    let material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/soccerBallTexture.jpg", scene);
    ball.material = material;

    //scene.beginDirectAnimation(ball, [moveBall], 0, 10, true);
    ballAnimationGroup = new B.AnimationGroup("moveBall")
    ballAnimationGroup.addTargetedAnimation(moveBall, ball)
    scene.animationGroups[0].play(true)
    
    return scene;
};

function addLightAndCamera(scene) {
    const hemi = new B.HemisphericLight("hemi-light", new B.Vector3(0, 1, 0), scene);
    hemi.intensity = 0.8;

    let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 50, 30), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, -1, 0);
    camera.attachControl(canvas, true);
}

function addGround(scene) {
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 200, width: 100, subdivisions: 4 }, scene);
    ground.position.y -= 1.5
    ground.checkCollisions = true;

   let material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0, 1, 0);
    ground.material = material;
}

function addSkybox(scene) {
    let skybox = B.Mesh.CreateBox("skyBox", 500, scene);
    skybox.position.y = -4;
    skybox.infiniteDistance = true;
    
    let skyboxMaterial = new B.StandardMaterial("skyBoxMat", scene);
    skyboxMaterial.backFaceCulling = false;
    let files = ["_px.jpg", "_py.jpg", "_pz.jpg", "_nx.jpg", "_ny.jpg", "_nz.jpg"];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/cloudyDay/", scene, files);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
}

let scene = createScene();

let loop = function () {
    scene.render();

    //change to if not at a certain coordinate; then do if at that coordinate do the shooting animation 
    if (ballAnimationGroup.isPlaying === true) {
        ball.position.z -= 0.05
    }
    if (ball.position.z < -70){
        scene.animationGroups[0].stop()
        scene.beginDirectAnimation(ball, [shootBall], 25, 0, false);

       
    }
};

engine.runRenderLoop(loop);

let resize = function () {
    engine.resize();
}

window.addEventListener("resize", resize);