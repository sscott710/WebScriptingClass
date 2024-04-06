let mainElement = document.querySelector("main")
let newDiv1 = document.createElement("div")
newDiv1.setAttribute("class", "box1")
newDiv1.innerHTML += 'Hello';
mainElement.append(newDiv1)

let newDiv2 = document.createElement("div")
newDiv2.setAttribute("class", "box2")
newDiv2.innerHTML += 'Hola';
mainElement.append(newDiv2)

let newDiv3 = document.createElement("div")
newDiv3.setAttribute("class", "box3")
newDiv3.innerHTML += 'Bonjour';
mainElement.append(newDiv3)

let sectionElement = document.querySelector("section")
let button1 = document.createElement("button")
button1.setAttribute("class", "button")
button1.setAttribute("id", "addBoxBtn")
button1.innerHTML += 'Append box'
sectionElement.append(button1);

let button2 = document.createElement("button")
button2.setAttribute("class", "button")
button2.setAttribute("id", "removeBoxBtn")
button2.innerHTML += 'Remove box'
sectionElement.append(button2);

let button3 = document.createElement("button")
button3.setAttribute("class", "button")
button3.setAttribute("id", "modifyBoxBtn")
button3.innerHTML += 'Modify box'
sectionElement.append(button3);

let button4 = document.createElement("button")
button4.setAttribute("class", "button")
button4.setAttribute("id", "mysteryBtn")
button4.innerHTML += 'Mystery'
sectionElement.append(button4);

function addBoxHandler() {
    let newDiv4 = document.createElement("div")
    newDiv4.setAttribute("class", "box4")
    newDiv4.innerHTML += 'Ciao';
    mainElement.append(newDiv4)

}
let addBoxBtn = document.querySelector("#addBoxBtn")
addBoxBtn.addEventListener("click", addBoxHandler)

function removeBoxHandler() {
    let firstElement = mainElement.firstChild
    firstElement.remove()

}
let removeBoxBtn = document.querySelector("#removeBoxBtn")
removeBoxBtn.addEventListener("click", removeBoxHandler)

function modifyBoxHandler() {
    let firstElement = mainElement.firstChild  
    if (firstElement.classList.contains("box1") || firstElement.classList.contains("box2") || firstElement.classList.contains("box3")){
        firstElement.setAttribute("class", "box4")
    }  
    else {
        firstElement.setAttribute("class", "box1")
    }

}
let modifyBoxBtn = document.querySelector("#modifyBoxBtn")
modifyBoxBtn.addEventListener("click", modifyBoxHandler)

function mysteryHandler() {
    let sectionElement = document.querySelector("section")
    let newDiv5 = document.createElement("div")
    sectionElement.append(newDiv5)
    let img = document.createElement("img");
    img.src = "/coursework/images/Garfield_the_Cat.svg.png"
    newDiv5.append(img)  

}
let mysteryBtn = document.querySelector("#mysteryBtn")
mysteryBtn.addEventListener("click", mysteryHandler)
