import { asyncLoadImage } from "./load-image.js";

let holder = document.createElement("div")
holder.id = "holder"

let url = ["images/spongebob.jpg", "Spongebob"]
let url2 = ["images/Patrick_Star.svg.png", "Patrick"]

async function makeImage(url){
    let div1 = document.createElement("div")
    div1.className = "box"
    let imgElm = await asyncLoadImage(url[0])
    div1.appendChild(imgElm)
    let sp = document.createElement("span")
    sp.innerHTML = url[1]
    div1.appendChild(sp)
    return div1
}

async function makeHolder(){
    let temp = await makeImage(url)
    holder.appendChild(temp)
    temp = await makeImage(url2)
    holder.appendChild(temp)
    return holder
}

export { makeHolder } 