//moves elements to a random location, specifically apple and snake (at beginning)
function moveToRandomLocation(elm) {
    let mainWidth = +(window.getComputedStyle(main).getPropertyValue('width').match(/\d+/))
    let mainHeight = +(window.getComputedStyle(main).getPropertyValue('height').match(/\d+/))

    let elmWidth = +(window.getComputedStyle(elm).getPropertyValue('width').match(/\d+/))
    let elmHeight = +(window.getComputedStyle(elm).getPropertyValue('height').match(/\d+/))

    let numCols = Math.floor(mainWidth / elmWidth)
    let numRows = Math.floor(mainHeight / elmHeight)

    let col = Math.floor(Math.random() * numCols)
    let row = Math.floor(Math.random() * numRows)

    //avoid generation right next to wall-
    if (col === 0){
        col = 1
    }
    if( col === 39) {
        col = 38
    }
    if (row === 0){
        row = 1
    }
    if (row === 17){
        row = 16
    }

    elm.style.left = (col * elmWidth) + "px"
    elm.style.top = (row * elmHeight) + "px"
}

//makes keys work and change direction 
let changeDirection = function (event) {

    let key = event.keyCode

    //by adding checks for current direction it helps with my check if its colldies with itself method
    if (key == 37 && currentDirection != "right") {
        currentDirection = "left";
    }
    else if (key == 38 && currentDirection != "down") {
        currentDirection = "up";
    }
    else if (key == 39 && currentDirection != "left") {
        currentDirection = "right"
    }
    else if (key == 40 && currentDirection != "up") {
        currentDirection = "down"
    }

    console.log(currentDirection)
}

//moves snake so it stays together
function moveSnake() {

    let tail = snake.firstElementChild
    let head = snake.lastElementChild

    if (tail.classList.contains('hidden')) {
        tail.classList.remove('hidden')
    }

    let snakeTop = +(window.getComputedStyle(head).getPropertyValue('top').match(/\d+/))
    let snakeLeft = +(window.getComputedStyle(head).getPropertyValue('left').match(/\d+/))

    let snakeWidth = +(window.getComputedStyle(head).getPropertyValue('width').match(/\d+/))
    let snakeHeight = +(window.getComputedStyle(head).getPropertyValue('height').match(/\d+/))

    if (currentDirection === "left") {
        snakeLeft -= snakeWidth;
    }
    else if (currentDirection === "up") {
        snakeTop -= snakeHeight;
    }
    else if (currentDirection === "right") {
        snakeLeft += snakeWidth;
    }
    else if (currentDirection === "down") {
        snakeTop += snakeHeight;
    }

    tail.style.left = snakeLeft + "px"
    tail.style.top = snakeTop + "px"

    snake.removeChild(tail)
    snake.appendChild(tail)

    //check if snake intercepted apple
    if (snakeCollidesWithApple()) {
        document.dispatchEvent(collision)
    }

    //check if snake hit wall
    if (snakeCollidesWithWall()) {
        document.dispatchEvent(gameOver)
    }

    //check if snake hit itself
    if (snakeCollidesWithItself()) {
        document.dispatchEvent(gameOver)
    }
}

//determines if snake intercepted/ate apple
function snakeCollidesWithApple() {
    let head = snake.lastElementChild

    let headTop = +(window.getComputedStyle(head).getPropertyValue('top').match(/\d+/))
    let headLeft = +(window.getComputedStyle(head).getPropertyValue('left').match(/\d+/))

    let appleTop = +(window.getComputedStyle(apple).getPropertyValue('top').match(/\d+/))
    let appleLeft = +(window.getComputedStyle(apple).getPropertyValue('left').match(/\d+/))

    let headWidth = +(window.getComputedStyle(head).getPropertyValue('width').match(/\d+/))
    let headHeight = +(window.getComputedStyle(head).getPropertyValue('height').match(/\d+/))

    let dTop = Math.abs(headTop - appleTop)
    let dLeft = Math.abs(headLeft - appleLeft)

    if (dTop < headHeight && dLeft < headWidth) {
        return true
    }
    return false
}

//add new body part to snake
function lengthenSnake() {
    let segment = document.createElement("div")
    segment.className = "snake hidden"
    numSeg = numSeg + 1
    segment.id = numSeg

    snake.prepend(segment)
}

//checks if snake hit the wall
function snakeCollidesWithWall() {
    let head = snake.lastElementChild

    let headTop = +(window.getComputedStyle(head).getPropertyValue('top').match(/\d+/))
    let headLeft = +(window.getComputedStyle(head).getPropertyValue('left').match(/\d+/))

    //coordinates of wall border
    let wallTop =0;
    let wallBottom = 425;
    let wallLeft = 0;
    let wallRight = 975;

    if (headTop === wallTop || headLeft === wallLeft) {
        return true
    }
    if (headTop === wallBottom || headLeft === wallRight) {
        return true
    }
    return false
}

//checks if snake hit itself
function snakeCollidesWithItself() {
    let head = snake.lastElementChild
    let headID = head.id

    let headTop = +(window.getComputedStyle(head).getPropertyValue('top').match(/\d+/))
    let headLeft = +(window.getComputedStyle(head).getPropertyValue('left').match(/\d+/))

    for (let i =1; i <= numSeg; i++){
        if (headID != i.toString()){
            let d = document.getElementById(i.toString());
            console.log("checking: " + i)
            let dTop = +(window.getComputedStyle(d).getPropertyValue('top').match(/\d+/))
            let dLeft = +(window.getComputedStyle(d).getPropertyValue('left').match(/\d+/))
            if (dTop === headTop && dLeft === headLeft){
                return true
            }
            
        }
        
    }

    return false
}

let main = document.querySelector("main")
let snake = document.querySelector("#snake")
let scoreDiv = document.querySelector("#score")

let apple = document.createElement("img")
apple.src = "images/apple8.png"
main.appendChild(apple)

let head = document.createElement("div")
head.className = "snake"
head.id = 1
snake.appendChild(head)

let score = 0
let numSeg = 1
main.focus = true;

moveToRandomLocation(apple)
moveToRandomLocation(head)

//makes sure snake doesn't start moving in direction of wall 
let currentDirection = "right"
if (+(window.getComputedStyle(head).getPropertyValue('left').match(/\d+/)) > 500){
    currentDirection = "left"
}
if( +(window.getComputedStyle(head).getPropertyValue('top').match(/\d+/)) === 0){
    currentDirection = "down"
}
if( +(window.getComputedStyle(head).getPropertyValue('top').match(/\d+/)) === 425){
    currentDirection = "up"
}


document.body.addEventListener("keydown", changeDirection)

let collision = new CustomEvent("collision", { detail: "snake" })
let gameOver = new CustomEvent("collision2", { detail: "wall" }) 

document.addEventListener("collision", (e) => {
    score = score + 1
    scoreDiv.textContent = "score: " + score;
    moveToRandomLocation(apple)
    lengthenSnake()
    
})

let timerID = setInterval(moveSnake, 350)

document.addEventListener("collision2", (e) => {
    console.log(e.detail)
    console.log("game over")
    clearInterval(timerID)
    let gameOverDiv = document.createElement("div")
    gameOverDiv.className = "gameOver"
    gameOverDiv.innerHTML = "Game Over"
    main.appendChild(gameOverDiv)

    
})
