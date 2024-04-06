//for assignment 2
//Chapter 1- introduction
console.log("Chapter 1 exercises");
//prints hello world in console
console.log("Hello world");

//varible x
let x, a, b, c, d, e;
x=0;
a=null;
b= 0.01;
c = 'hi';
d = true;
e = undefined;

console.log("some types of variables: " + x + " "+ a + " " + b + " " + c + " " + d + " " + e);

//object
let book = {
    topic: "Javascript",
    edition: 7
};
console.log(book.topic)

//array
let primes = [2, 3, 5, 7];
console.log(primes);
console.log("length of primes: " + primes.length);

//array of objects
let points = [
    {x:0, y: 0},
    {x:1, y:1}
]
console.log(points);

//operators
let f = 3 + 4 
console.log("3 + 4=" +f);
let z=2, y=3;
console.log(x===y)
console.log(!(x===y))

//functions
function plus1(x){
    return x +1;
}
console.log("4 + 1 =" + plus1(4));

let arr = [];
arr.push(1, 2, 3);
console.log(arr);

function sum(array){
    let sum =0;
    for (let x of array){
        sum+=x;
    
    }
    return sum;
}
console.log(sum(arr));

//Chapter 2: Lexical Structure
//JS case sensitive
//single line comment
/* multi
        line
            comment 
*/
console.log("Literals: " + 12 + ", " + 1.2 + ", " + 'hi' + ", " + true + ", " + null);

//unicode esacape sequences
console.log("caf\u00e9")
console.log("\u{1F600}")
let w
=
3 
console.log(w)