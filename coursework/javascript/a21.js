import { leftLegMove, rightLegMove } from "../javascript/moveLegs.js";
let B = BABYLON;

let canvas = document.getElementById("renderCanvas");

let man = undefined
let man2 = undefined
let engine = new B.Engine(canvas, true);
let createScene = function () {

    let scene = new B.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;

    addLightAndCamera(scene)
    addDeck(scene)
    addSky(scene)
    addParticleSystem(scene)
    addSand(scene)
    addSound(scene)
    addRails(scene)
    addSprites(scene)

    //creating the black figures that will be walking
    man = new B.MeshBuilder.CreateCylinder("man", { height: 3})
    man.metadata = "man"
    man.position.y = 3
    man.position.x = 5
    man.position.z = 10
    man.checkCollisions = true
    man.applyGravity = true
    //color
    let material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0, 0, 0);
    man.material = material;

    //left leg
    let leftLeg = new B.MeshBuilder.CreateBox("leftLeg", { height: 1.5, width: 0.3, depth: 0.3})
    leftLeg.metadata = "man"
    leftLeg.position.x = 4.7
    leftLeg.position.y= 1
    leftLeg.position.z = 10
    leftLeg.material = material;
    leftLeg.checkCollisions = true


    //right leg
    let rightLeg = new B.MeshBuilder.CreateBox("rightLeg", { height: 1.5, width: 0.3, depth: 0.3})
    rightLeg.metadata = "man"
    rightLeg.position.x = 5.3
    rightLeg.position.y= 1
    rightLeg.position.z = 10
    rightLeg.material = material;
    rightLeg.checkCollisions = true


    //head
    let head = new B.MeshBuilder.CreateCylinder("head", { height: 1, diameter: 0.7})
    head.metadata = "man"
    head.position.y = 5
    head.position.x = 5
    head.position.z = 10
    head.material = material;
    head.checkCollisions = true


    //hat
    const brim = BABYLON.MeshBuilder.CreateDisc("brim", {radius: 0.8});
    brim.metadata = "man"
    brim.rotation.x = -Math.PI /2
    brim.position.y = 5.5
    brim.position.x = 5
    brim.position.z = 10
    brim.material = material;
    brim.checkCollisions = true

    let hat = new B.MeshBuilder.CreateCylinder("hat", { height: 0.5, diameter: 0.8})
    hat.metadata = "man"
    hat.position.y = 5.8
    hat.position.x = 5
    hat.position.z = 10
    hat.material = material;
    hat.checkCollisions = true


    man.addChild(leftLeg)
    man.addChild(rightLeg)
    man.addChild(head)
    man.addChild(brim)
    man.addChild(hat)

    //man2- change slightly
    man2 = new B.MeshBuilder.CreateCylinder("man2", { height: 3})
    man2.metadata = "man2"
    man2.position.y = 3
    man2.position.z = 10
    man2.position.x = 2
    man2.checkCollisions = true
    man2.applyGravity = true
    man2.material = material;
    

    //left leg
    let leftLeg2 = new B.MeshBuilder.CreateBox("leftLeg2", { height: 1.5, width: 0.3, depth: 0.3})
    leftLeg2.metadata = "man2"
    leftLeg2.position.x = 1.7
    leftLeg2.position.y = 1
    leftLeg2.position.z = 10
    leftLeg2.material = material;
    leftLeg2.checkCollisions = true


    //right leg
    let rightLeg2 = new B.MeshBuilder.CreateBox("rightLeg2", { height: 1.5, width: 0.3, depth: 0.3})
    rightLeg2.metadata = "man2"
    rightLeg2.position.x = 2.3
    rightLeg2.position.y = 1
    rightLeg2.position.z = 10
    rightLeg2.material = material;
    rightLeg2.checkCollisions = true


    //head
    let head2 = new B.MeshBuilder.CreateSphere("head2", { diameter: 1})
    head2.metadata = "man2"
    head2.position.y = 5
    head2.position.x = 2
    head2.position.z = 10
    head2.material = material;
    head2.checkCollisions = true

    //hat
    const brim2 = BABYLON.MeshBuilder.CreateDisc("brim2", {radius: 0.8});
    brim2.metadata = "man2"
    brim2.rotation.x = -Math.PI /2
    brim2.position.y = 5.5
    brim2.position.x = 2
    brim2.position.z = 10
    brim2.material = material;
    brim2.checkCollisions = true

    let hat2 = new B.MeshBuilder.CreateBox("hat2", { height: 0.7, width:0.7, depth: 0.7})
    hat2.metadata = "man2"
    hat2.position.y = 5.9
    hat2.position.x = 2
    hat2.position.z = 10
    hat2.material = material;
    hat2.checkCollisions = true
    
    man2.addChild(leftLeg2)
    man2.addChild(rightLeg2)
    man2.addChild(head2)
    man2.addChild(brim2)
    man2.addChild(hat2)

    let manWalkAnimationGroup = new B.AnimationGroup("manWalkAnimation")
    manWalkAnimationGroup.addTargetedAnimation(leftLegMove, leftLeg)
    manWalkAnimationGroup.addTargetedAnimation(rightLegMove, rightLeg)
    manWalkAnimationGroup.addTargetedAnimation(leftLegMove, leftLeg2)
    manWalkAnimationGroup.addTargetedAnimation(rightLegMove, rightLeg2)
    scene.animationGroups[0].play(true)


    return scene;
};

//universal camera and hemispheric light
function addLightAndCamera(scene) {
    let light = new B.HemisphericLight("hemi-light", new B.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    
    //not perfect needs work
    let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(30,1,-20), scene);
    camera.attachControl(canvas, true);
    //console.log(camera.position)

    camera.applyGravity = true;
    //camera.ellipsoid = new BABYLON.Vector3(1, 40, 1);
    camera.checkCollisions = true;
    camera.speed = 2;
    //camera.rotation.y = -Math.PI / 2;
    
};

//first ground- the long deck that the figures are standing on
function addDeck(scene){
    const deck = BABYLON.MeshBuilder.CreateGround("ground", { height: 510, width: 100, maxHeight: 0, minHeight: 0
    }, scene, false);
    deck.position.y =0;
    deck.checkCollisions = true;

    let materialDeck = new BABYLON.StandardMaterial("texture1", scene);
    materialDeck.diffuseTexture = new BABYLON.Texture("images/deck.jpg", scene);
    deck.material = materialDeck;

    //ramp
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:2, width: 100, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    plane.rotation.x = -90
    plane.position.z = -255
    plane.position.y = -1
    let material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new BABYLON.Texture("images/deck.jpg", scene);
    plane.material = material;
    
}

//add skybox
function addSky(scene){
    let skybox = B.Mesh.CreateBox("skyBox", 10000, scene);
    skybox.position.y = -4;
    skybox.infiniteDistance = true;

    let skyboxMaterial = new B.StandardMaterial("skyBoxMat", scene);
    skyboxMaterial.backFaceCulling = false;
    let files = ["_px.jpg", "_py.jpg", "_pz.jpg", "_nx.jpg", "_ny.jpg", "_nz.jpg"];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/painting/", scene, files);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    /*//Create PhotoDome
    let dome = new BABYLON.PhotoDome(
        "testdome",
        "images/skyPainting.jpg",
        {
            resolution: 32,
            size: 1000,
            useDirectMapping: false
        },
        scene
    );
    dome.imageMode = BABYLON.PhotoDome.MODE_MONOSCOPIC;
    dome.fovMultiplier = 2.0;
    dome.isPickable = false;*/
}

async function addParticleSystem(scene) {
    //particle system
    // Create a particle system
    const particleSystem = new BABYLON.ParticleSystem("particles", 2000);

    //Texture of each particle
    //particleSystem.particleTexture = new BABYLON.Texture("images/flare.png");
    particleSystem.particleTexture = new BABYLON.Texture("images/whiteLine.png"); //before it was flare.png

    // Position where the particles are emitted from
    particleSystem.emitter = new BABYLON.Vector3(0, -2, 400);
    particleSystem.start();

    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 5;

    particleSystem.direction1 = new BABYLON.Vector3(-40, 40, 20);
    particleSystem.direction2 = new BABYLON.Vector3(40, 40, -20);

    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI / 2;    

    particleSystem.minSize = 5;
    particleSystem.maxSize = 50;

    particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 0.1);
    particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0.9);

    particleSystem.addRampGradient(0.0, new BABYLON.Color3(1, 1, 1));
    particleSystem.addRampGradient(0.09, new BABYLON.Color3(209/255, 204/255, 15/255));
    particleSystem.addRampGradient(0.18, new BABYLON.Color3(221/255, 120/255, 14/255));
    particleSystem.addRampGradient(0.28, new BABYLON.Color3(200/255, 43/255, 18/255));
    particleSystem.addRampGradient(0.47, new BABYLON.Color3(115/255, 22/255, 15/255));
    particleSystem.addRampGradient(0.88, new BABYLON.Color3(14/255, 14/255, 14/255));
    particleSystem.addRampGradient(1.0, new BABYLON.Color3(14/255, 14/255, 14/255));

    particleSystem.useRampGradients = true;
}

//add sand, water
function addSand(scene){
    const sand = BABYLON.MeshBuilder.CreateGround("ground", { height: 400, width: 400, maxHeight: 0, minHeight: 0
    }, scene, false);
    sand.position.y =-2;
    sand.position.z = -200
    sand.checkCollisions = true;

    let materialSand = new BABYLON.StandardMaterial("texture1", scene);
    materialSand.diffuseTexture = new BABYLON.Texture("images/sand.jpg", scene);
    sand.material = materialSand;

    //add water
    const water = BABYLON.MeshBuilder.CreateGround("ground", { height: 200, width: 400, maxHeight: 0, minHeight: 0
    }, scene, false);
    water.position.z = 100
    water.position.y = -2

    let materialWater = new BABYLON.StandardMaterial("texture1", scene);
    materialWater.diffuseTexture = new BABYLON.Texture("images/water.jpg", scene);
    water.material = materialWater;

    //add lighter water with ships
    const water2 = BABYLON.MeshBuilder.CreateGround("ground", { height: 200, width: 400, maxHeight: 0, minHeight: 0
    }, scene, false);
    water2.position.z = 300
    water2.position.y = -2

    let materialWater2 = new BABYLON.StandardMaterial("texture1", scene);
    materialWater2.diffuseTexture = new BABYLON.Texture("images/lightWater.jpg", scene);
    water2.material = materialWater2;
}

function addSound(scene){
    const scream = new BABYLON.Sound("scream", "music/SCREAM_4.wav", scene);
    setInterval(() => scream.play(), 10000);
}

function addRails(scene){
    //add rails to baordwalk
    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "rail.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let rail = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(rail)
        }

        //OG rail and its properties- right rail
        rail.position = new BABYLON.Vector3(49, 1.8, 0)
        rail.rotationQuaternion = null;
        rail.rotation.x = Math.PI/2
        rail.rotation.z= Math.PI/2
        rail.scaling =new BABYLON.Vector3(0.03, 0.03, 0.03)
        rail.checkCollisions = true
        rail.applyGravity = true;

        //clones
        let railLeft = rail.clone("rail2");
        railLeft.position.x = -49

        
        //multiple
        for (let i=1; i<32; i++){
            let railn = rail.clone("rail" + i)
            railn.position.z = i *8 
            let rail2n = rail.clone("rail2" + i)
            rail2n.position.z = -(i *8) 
            let railLeftn = rail.clone("railLeft" + i)
            railLeftn.position.x = -49
            railLeftn.position.z = i *8
            let railLeft2n = rail.clone("railLeft2" + i)
            railLeft2n.position.x = -49
            railLeft2n.position.z = -(i *8)
        }
        let railfarR = rail.clone("railfarR");
        railfarR.position.z = -254
        let railfarL = rail.clone("railfarL");
        railfarL.position.z = -254
        railfarL.position.x = -49  
    })

    //back rails
    BABYLON.SceneLoader.ImportMesh(null, "./assets/", "rail.glb", scene,
    function (meshes, particalSystem, skeletons) {
        console.log(meshes)
        for (let mesh of meshes) {
            mesh.checkCollisions = true;
        }

        let rail = meshes[0];
        for (let i = 1; i < meshes.length; i++) {
            meshes[i].setParent(rail)
        }

        //OG rail and its properties- right rail
        rail.position = new BABYLON.Vector3(0, 1.8, 255)
        rail.rotationQuaternion = null;
        rail.rotation.x = Math.PI/2
        rail.scaling =new BABYLON.Vector3(0.03, 0.03, 0.03)
        rail.checkCollisions = true
        rail.applyGravity = true;

        //clones
        for (let i=1; i<7; i++){
            if (i!=6){
                let railn = rail.clone("rail" + i)
                railn.position.x = i *8 
            }
            let rail2n = rail.clone("rail2" + i)
            rail2n.position.x = -(i *8) 
        }
        let railfarR = rail.clone("railfarR");
        railfarR.position.x = 43

    })
}

function addSprites(scene){
    //add sprites- ships
    const spriteManagerShips = new BABYLON.SpriteManager("shipsManager", "images/ship.png", 2000, {width: 610, height: 850});
    const ship = new BABYLON.Sprite("ship", spriteManagerShips);
    ship.width = 10;
    ship.height = 15;
    ship.position.z =300
    ship.position.x = -100

    let ship2 = new BABYLON.Sprite("ship2", spriteManagerShips);
    ship2.width = 10;
    ship2.height = 15;
    ship2.position.z =400
    ship2.position.x = 100

    let ship3 = new BABYLON.Sprite("ship3", spriteManagerShips);
    ship3.width = 10;
    ship3.height = 15;
    ship3.position.z = 350
    ship3.position.x = 50

    //add scream dude
    const spriteManagerScreamer = new BABYLON.SpriteManager("screamManager", "images/screamFigure.png", 2000, {width: 2000, height: 4000});
    const screamDude = new BABYLON.Sprite("scream", spriteManagerScreamer);
    screamDude.width = 10;
    screamDude.height = 15;
    screamDude.position.x = 35
}

let scene = createScene();

let loop = function () {
    scene.render();

    if (man.position.z < 250){
        man.position.z += 0.005//change to 0.5 for real
        //scene.animationGroups[0].pause()
    }
    if (man2.position.z < 250){
        man2.position.z += 0.005//change to 0.5 for real
        //scene.animationGroups[0].pause()
    }

};

engine.runRenderLoop(loop);

let resize = function () {
    engine.resize();
}

window.addEventListener("resize", resize);