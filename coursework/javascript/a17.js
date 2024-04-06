let B = BABYLON

let canvas = document.querySelector("canvas")

let engine = new B.Engine(canvas, true)

let createScene = function () {
    let scene = new B.Scene(engine)

    let camera = new B.ArcRotateCamera("cam", 0.75 * Math.PI, 0.4 * Math.PI, 60, new B.Vector3(0, -7, 0), scene)
    camera.attachControl(canvas, false)

    let light = new B.HemisphericLight("hemi", new B.Vector3(0, 1, 0), scene)

    //making the meshes
    let cylinder = B.Mesh.CreateCylinder("cylinder", 3, 3, 3, 30, 1, scene, false)
    let cylinder2 = B.Mesh.CreateCylinder("cylinder", 3, 3, 3, 30, 1, scene, false)
    let cylinder3 = B.Mesh.CreateCylinder("cylinder", 3, 3, 3, 30, 1, scene, false)
    let cylinder4 = B.Mesh.CreateCylinder("cylinder", 3, 3, 3, 30, 1, scene, false)
    let box = B.Mesh.CreateBox("box", 4.0, scene)
    let box2 = B.Mesh.CreateBox("box", 6.0, scene);
    let box3 = B.Mesh.CreateBox("box", 6.0, scene);
    let sphere = B.Mesh.CreateSphere("sphere", 5.0, 2.0, scene);
    let sphere2 = B.Mesh.CreateSphere("sphere", 20.0, 8.0, scene);
    let sphere3 = B.Mesh.CreateSphere("sphere", 10.0, 4.0, scene);
    let torus = B.Mesh.CreateTorus("torus", 40, 10, 4, scene, false);
    let plane = B.Mesh.CreatePlane("plane", 10, scene, false, B.Mesh.DOUBLESIDE);
    let plane2 = B.Mesh.CreatePlane("plane", 35, scene, false, B.Mesh.DOUBLESIDE);
    let knot = B.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 8, 2, scene);
    let lines = B.Mesh.CreateLines("lines", [
        new B.Vector3(-20, 0, 0),
        new B.Vector3(20, 0, 0),
        new B.Vector3(0, 0, -20),
        new B.Vector3(0, 20, 0)
    ], scene);

    //positioning the meshes
    box.position = new B.Vector3(0, 0, 0);
    box2.position = new B.Vector3(0, 0, 10);
    box3.position = new B.Vector3(0, 0, -10);
    cylinder.position.x = -10;
    cylinder2.position.x = -10;
    cylinder2.position.y = 5;
    cylinder3.position.x = -10;
    cylinder3.position.y = 10;
    cylinder4.position.x = -10;
    cylinder4.position.y = 15;
    sphere.position = new B.Vector3(10, 0, 0);
    sphere2.position = new B.Vector3(10, 8, 0);
    sphere3.position = new B.Vector3(10, 16, 0);
    torus.position.y = -5
    plane.rotation.x = 90
    plane2.position.y = -10
    plane2.rotation.x = 30
    knot.position.y = 10

    //adding texture or color
    let material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/tableCloth.jpg", scene);
    box.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/Garfield_the_Cat.svg.png", scene);
    box2.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/025Pikachu.webp", scene);
    box3.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0, 1, 0);
    cylinder.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0.18, 0.54, 0.34);
    cylinder2.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0.25, 0.95, 0.81);
    cylinder3.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0.21, 0.39, 0.23);
    cylinder4.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(0, 0, 1);
    plane2.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/golfBallPattern.jpg", scene);
    sphere.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/basketball-texture-free-vector.webp", scene);
    sphere2.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/softball.webp", scene);
    sphere3.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseColor = new B.Color3(1, 1, 0);
    torus.material = material;

    material = new B.StandardMaterial("texture1", scene);
    material.diffuseTexture = new B.Texture("images/rope.jpg", scene);
    knot.material = material;
    


    return scene
}

let scene = createScene()

let loop = function () {
    scene.render();
}

engine.runRenderLoop(loop)

let resize = function () {
    engine.resize();
}

window.addEventListener("resize", resize)