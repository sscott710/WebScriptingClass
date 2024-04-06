let B = BABYLON;

let canvas = document.getElementById("renderCanvas");

let engine = new B.Engine(canvas, true);

let createScene = function () {

    let scene = new B.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;


    //https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
    let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(30,30,30), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    //let camera = new B.ArcRotateCamera("cam", 0.75 * Math.PI, 0.40 * Math.PI, 60, new B.Vector3(0, -7, 0), scene);
    //camera.attachControl(canvas, false);

    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 40, 1);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, 0.9, 0);
    camera.checkCollisions = true;
    camera.speed = 10;
    camera.height = 5;
    camera.rotation.y = -Math.PI / 2;

    let hemi = new B.HemisphericLight("hemi-light", new B.Vector3(0, 1, 0), scene);
    hemi.intensity = 0.7;

    //let box = new B.Mesh.CreateBox("", 2, scene)

    addGroundAndSkybox(scene)
    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "mushroom_redGroup.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let mushroom = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(mushroom)
        }

        mushroom.position = new BABYLON.Vector3(-15, 3, -30)
        mushroom.scaling =new BABYLON.Vector3(60, 60, 60)
        
    });

    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "campfire_logs.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let logs = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(logs)
        }

        logs.position = new BABYLON.Vector3(-10, 3, 11)
        logs.scaling =new BABYLON.Vector3(30, 30, 30)
        
    });

    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "stump_roundDetailed.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let stump = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(stump)
        }

        stump.position = new BABYLON.Vector3(-25, 3, 11)
        stump.scaling =new BABYLON.Vector3(30, 30, 30)
        
    });

    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "stump_roundDetailed.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let stump = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(stump)
        }

        stump.position = new BABYLON.Vector3(-10, 3, -5)
        stump.scaling =new BABYLON.Vector3(30, 30, 30)
        
    });
    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "stump_roundDetailed.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let stump = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(stump)
        }

        stump.position = new BABYLON.Vector3(-10, 3, 30)
        stump.scaling =new BABYLON.Vector3(30, 30, 30)
        
    });
    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "tent_detailedClosed.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let tent = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(tent)
        }

        tent.position = new BABYLON.Vector3(-90, 3, 30)
        tent.scaling =new BABYLON.Vector3(70, 70, 70)
        //tent.rotation.x = Math.PI / 2
        
    });

    let sphere = B.Mesh.CreateSphere("sphere", 5.0, 5.0, scene);
    sphere.position = new B.Vector3(-10, 3, 11);
    material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/fire.webp", scene);
    sphere.material = material;

    let music = new BABYLON.Sound("Music", "music/HitsDifferent.m4a", scene, null, {
        loop: true,
        autoplay: true
      });




    return scene;
};

let addGroundAndSkybox = function (scene) {

    let ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "images/cubes.jpg", {
        width: 10000, height: 10000, subdivisions: 8, maxHeight: 4, minHeight: 0
    }, scene, false);
    ground.checkCollisions = true;

    let materialground = new BABYLON.StandardMaterial("texture1", scene);
    materialground.diffuseTexture = new BABYLON.Texture("images/grass3.jpg", scene);
    ground.material = materialground;

    let skybox = B.Mesh.CreateBox("skyBox", 500, scene);
    skybox.position.y = -4;
    skybox.infiniteDistance = true;

    let skyboxMaterial = new B.StandardMaterial("skyBoxMat", scene);
    skyboxMaterial.backFaceCulling = false;
    let files = ["_px.jpg", "_py.jpg", "_pz.jpg", "_nx.jpg", "_ny.jpg", "_nz.jpg"];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/cloudyDay/", scene, files);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

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