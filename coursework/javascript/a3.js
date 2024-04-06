//add button
const sumButton = document.querySelector("#computeSum")

const add = function () {

    const input1 = document.querySelector("#input1")
    const value1 = input1.value

    const input2 = document.querySelector("#input2")
    const value2 = input2.value

    let sum = value1 + value2
    sum = parseInt(value1) + parseInt(value2)
    sum = Number(value1) + Number(value2)
    sum = +value1 + +value2

    const sumInput = document.querySelector("#answer")
    sumInput.value = sum

}

sumButton.addEventListener("click", add)

//subtract button
const subButton = document.querySelector("#computeDifference")

const sub = function () {

    const input1 = document.querySelector("#input1")
    const value1 = input1.value

    const input2 = document.querySelector("#input2")
    const value2 = input2.value

    let difference = Number(value1) - Number(value2)

    const diffInput = document.querySelector("#answer")
    diffInput.value = difference

}

subButton.addEventListener("click", sub)

//multiplication button
const multButton = document.querySelector("#computeMultiplication")

const mult = function () {

    const input1 = document.querySelector("#input1")
    const value1 = input1.value

    const input2 = document.querySelector("#input2")
    const value2 = input2.value

    let product = Number(value1) * Number(value2)

    const multInput = document.querySelector("#answer")
    multInput.value = product

}

multButton.addEventListener("click", mult)

//division button
const divButton = document.querySelector("#computeDivison")

const div = function () {

    const input1 = document.querySelector("#input1")
    const value1 = input1.value

    const input2 = document.querySelector("#input2")
    const value2 = input2.value

    let quotient = Number(value1) / Number(value2)

    const divInput = document.querySelector("#answer")
    divInput.value = quotient

}

divButton.addEventListener("click", div)

//square button
const exButton = document.querySelector("#computeExponent")

const expo = function () {

    const input1 = document.querySelector("#input1")
    const value1 = input1.value


    const input2 = document.querySelector("#input2")
    const value2 = input2.value

    let exponent = Math.pow(Number(value1), Number(value2))

    const exInput = document.querySelector("#answer")
    exInput.value = exponent

}

exButton.addEventListener("click", expo)

//modulus
const modButton = document.querySelector("#computeModulus")

const mod = function () {

    const input1 = document.querySelector("#input1")
    const value1 = input1.value


    const input2 = document.querySelector("#input2")
    const value2 = input2.value

    let modulus = Number(value1) % Number(value2)

    const modInput = document.querySelector("#answer")
    modInput.value = modulus

}

modButton.addEventListener("click", mod)
