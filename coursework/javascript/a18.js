let B = BABYLON;

let canvas = document.getElementById("renderCanvas");

let engine = new B.Engine(canvas, true);

let createScene = function () {

    let scene = new B.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;


    //https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
    let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(2000,100,1000), scene);
    camera.attachControl(canvas, true);

    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 40, 1);
    camera.checkCollisions = true;
    camera.speed = 10;
    camera.rotation.y = -Math.PI / 2;

    let hemi = new B.HemisphericLight("hemi-light", new B.Vector3(0, 1, 0), scene);
    hemi.intensity = 0.7;

    //https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/ground_hmap
    let ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "images/starryNightGrey.png", {
        width: 6000, height: 6000, subdivisions: 16, maxHeight: 0, minHeight: -200
    }, scene, false);
    ground.checkCollisions = true;
    ground.position.y = 0;

    //image credit: https://www.researchgate.net/figure/A-black-white-rendition-of-V-van-Goghs-Starry-Night-van-Gogh-1889-It-is-shown_fig28_1803779 
    let materialground = new BABYLON.StandardMaterial("texture1", scene);
    materialground.diffuseTexture = new BABYLON.Texture("images/Starry-Night.webp", scene);
    ground.material = materialground;

    let skybox = B.Mesh.CreateBox("skyBox", 6000.0, scene);
    skybox.position.y = -100;
    skybox.infiniteDistance = true;

    // https://opengameart.org
    //https://opengameart.org/content/interstellar-skybox-png
    let skyboxMaterial = new B.StandardMaterial("skyBoxMat", scene);
    skyboxMaterial.backFaceCulling = false;

    
    let files = ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/cloudySpace/", scene, files);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    let box = B.Mesh.CreateBox("box", 50.0, scene);
    box.position = new B.Vector3(0, 0, 0);



    return scene;
};

let scene = createScene();

let loop = function () {
    scene.render();
};

engine.runRenderLoop(loop);

let resize = function () {
    engine.resize();
}

window.addEventListener("resize", resize);