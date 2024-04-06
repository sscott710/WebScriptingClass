import { moveBall, shootBall } from "./dribble.js";
let B = BABYLON;

let canvas = document.getElementById("renderCanvas");

let engine = new B.Engine(canvas, true);

let ball = undefined
let ballAnimationGroup = undefined
let shadowGenerator = undefined
let ground = undefined
let skybox = undefined

let createScene = function () {

    let scene = new B.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.98, 0);
    scene.collisionsEnabled = true;

    addLightAndCamera(scene)
    addGround(scene)
    addSkybox(scene)

    let post1 = B.Mesh.CreateCylinder("cylinder", 50, 3, 3, 20, 1, scene, false)
    post1.position = new B.Vector3(20, 0, -95);
    shadowGenerator.getShadowMap().renderList.push(post1);

    let post2 = B.Mesh.CreateCylinder("cylinder", 50, 3, 3, 20, 1, scene, false)
    post2.position = new B.Vector3(-20, 0, -95);
    shadowGenerator.getShadowMap().renderList.push(post2);

    let post3 = B.Mesh.CreateCylinder("cylinder", 50, 3, 3, 20, 1, scene, false)
    post3.rotation.z = Math.PI / 2
    post3.position = new B.Vector3(0, 26, -95);
    shadowGenerator.getShadowMap().renderList.push(post3);

    ball = B.Mesh.CreateSphere("sphere", 20.0, 8.0, scene);
    ball.position.y = 2
    let material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/soccerBallTexture.jpg", scene);
    ball.material = material;
    shadowGenerator.getShadowMap().renderList.push(ball);

    // add particle system
    let capacity = 200;
    const particleSystem = new BABYLON.ParticleSystem("particles", capacity, scene)
    particleSystem.particleTexture = new BABYLON.Texture("images/butterfly.png");

    let box = B.Mesh.CreateSphere("sphere", 2.0, 2.0, scene);
    box.position.z= -100
    particleSystem.emitter = box
    particleSystem.emitRate = 25;

    particleSystem.start();

    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    particleSystem.minInitialRotation = 0;
    //particleSystem.maxInitialRotation = Math.PI / 2;

    particleSystem.direction1 = new BABYLON.Vector3(-10, 10, 5);
    particleSystem.direction2 = new BABYLON.Vector3(10, 10, -5);

    particleSystem.minEmitPower = 2;
    particleSystem.maxEmitPower = 2;
    //particleSystem.updateSpeed = 0.005;

    particleSystem.minSize = 15;
    particleSystem.maxSize = 15;

    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 2;

    particleSystem.gravity = new BABYLON.Vector3(0, -3.81, 0);

    particleSystem.start()
    //scene.beginDirectAnimation(ball, [moveBall], 0, 10, true);
    ballAnimationGroup = new B.AnimationGroup("moveBall")
    ballAnimationGroup.addTargetedAnimation(moveBall, ball)
    scene.animationGroups[0].play(true)



    return scene;
};

function addLightAndCamera(scene) {
    let light = new B.PointLight("pointLight", new B.Vector3(130, 70, -50), scene);
    light.intensity = 0.8;

    shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

    let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 50, 30), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, -1, 0);
    camera.attachControl(canvas, true);
}

function addGround(scene) {
    ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 200, width: 100, subdivisions: 4 }, scene);
    ground.position.y -= 1.5
    ground.checkCollisions = true;
    ground.receiveShadows = true

    let material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0, 1, 0);
    ground.material = material;
}

function addSkybox(scene) {
    skybox = B.Mesh.CreateBox("skyBox", 500, scene);
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
    if (ball.position.z < -70) {
        scene.animationGroups[0].stop()
        scene.beginDirectAnimation(ball, [shootBall], 25, 0, false);
        particleSystem.stop()


    }
};

engine.runRenderLoop(loop);

let resize = function () {
    engine.resize();
}

window.addEventListener("resize", resize);