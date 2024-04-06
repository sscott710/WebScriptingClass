const frameRate = 10;
const frameRate2 = 25;

let moveBall = new BABYLON.Animation("moveBall",
    "position.x",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

let shootBall = new BABYLON.Animation("shootBall",
    "position.z",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

// Animation KeyFrames

function ballKeyFrames() {
    const keyFrames = []

    keyFrames.push({
        frame: 0,
        value: -25,
    })

    keyFrames.push({
        frame: frameRate * 1 / 2,
        value: 25,
    })

    keyFrames.push({
        frame: frameRate,
        value: -25,
    })

    return keyFrames
}

function shotKeyFrames() {
    const keyFrames = []

    keyFrames.push({
        frame: 0,
        value: -70,
    })

    keyFrames.push({
        frame: frameRate2 * 1 / 5,
        value: -75
    })

    keyFrames.push({
        frame: frameRate2 * 2/5,
        value: -80
    })

    keyFrames.push({
        frame: frameRate2 * 3/ 5,
        value: -85
    })

    keyFrames.push({
        frame: frameRate2 * 4/ 5,
        value: -90
    })

    keyFrames.push({
        frame: frameRate2,
        value: -95
    })

    return keyFrames
}

moveBall.setKeys(ballKeyFrames());
shootBall.setKeys(shotKeyFrames());


export { moveBall, shootBall }