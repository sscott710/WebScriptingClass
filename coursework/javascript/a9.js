import { makeHolder } from "./effect.js";

let bodyElm = document.querySelector("body")

let image = await makeHolder()

bodyElm.appendChild(image)

