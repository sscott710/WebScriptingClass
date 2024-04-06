const frameRate = 10;

let leftLegMove = new BABYLON.Animation("leftLegMove",
    "rotation.x",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

let rightLegMove = new BABYLON.Animation("rightLegMove",
    "rotation.x",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

// Animation KeyFrames

function leftLegKeyFrames() {
    const keyFrames = []

    keyFrames.push({
        frame: 0,
        value: 0,
    })

    keyFrames.push({
        frame: frameRate * 1 / 2,
        value: 0.3,
    })

    keyFrames.push({
        frame: frameRate,
        value: 0,
    })

    keyFrames.push({
        frame: frameRate * 3 / 2,
        value: -0.3,
    })

    keyFrames.push({
        frame: frameRate * 2,
        value: 0,
    })

    return keyFrames
}

function rightLegKeyFrames() {

    const keyFrames = []

    keyFrames.push({
        frame: 0,
        value: 0,
    })

    keyFrames.push({
        frame: frameRate * 1 / 2,
        value: -0.3,
    })

    keyFrames.push({
        frame: frameRate,
        value: 0,
    })

    keyFrames.push({
        frame: frameRate * 3 / 2,
        value: 0.3,
    })

    keyFrames.push({
        frame: frameRate * 2,
        value: 0,
    })

    return keyFrames
}


leftLegMove.setKeys(leftLegKeyFrames());
rightLegMove.setKeys(rightLegKeyFrames());

export { leftLegMove, rightLegMove }