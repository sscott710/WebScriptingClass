let title = document.createElement("h1")
title.innerHTML = "Assignment 8"
document.body.append(title)

function createRisingSun() {
    let sunImg = document.createElement("img")
    sunImg.id = "rising-sun"
    let url = "images/sun.gif"
    sunImg.setAttribute("src", url)
    document.body.appendChild(sunImg)
}

function createSlider() {
    let slider = document.createElement("div")
    slider.setAttribute("id", "slider")

    let ballonImg = document.createElement("img")
    let url = "images/baloon3.png"
    ballonImg.setAttribute("src", url)
    slider.appendChild(ballonImg)
    document.body.appendChild(slider)
}

function createSplashScreen() {
    let splashElement = document.createElement("div")
    splashElement.setAttribute("id", "splash-screen")

    let closeButton = document.createElement("button")
    closeButton.setAttribute("id", "cancel-button")
    closeButton.setAttribute("type", "button")

    splashElement.appendChild(closeButton)
    document.body.appendChild(splashElement)

    splashElement.addEventListener("click", deleteSplashScreen)
}

function createSplashScreenButton() {
    let createSplashScreenButton = document.createElement("button")
    createSplashScreenButton.setAttribute("type", "button")
    createSplashScreenButton.setAttribute("id", "create-button")
    createSplashScreenButton.innerHTML = "Open Splash Screen"
    createSplashScreenButton.addEventListener("click", createSplashScreen)

    document.body.firstElementChild.appendChild(createSplashScreenButton)
}

function deleteSplashScreen() {
    let splashScreen = document.querySelector("#splash-screen")
    document.body.removeChild(splashScreen)

}
function createPlane() {
    let planeImg = document.createElement("img")
    planeImg.id = "plane"
    let url = "images/plane2.png"
    planeImg.setAttribute("src", url)
    document.body.appendChild(planeImg)
}
/*function createCloud() {
    let cloudImg = document.createElement("img")
    cloudImg.id = "cloud"
    let url = "images/marioCloud.png"
    cloudImg.setAttribute("src", url)
    document.body.appendChild(cloudImg)
}*/

createSplashScreen()
createSplashScreenButton()
createRisingSun()
createSlider()
createPlane()
//createCloud()
