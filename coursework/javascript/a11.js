/* 1 */
let obj1 = {
    number: 5,
    greeting: "hello",
    arr: [2, 3, 4],
    student: {
        firstName :"John",
        lastName: "Smith"
    }
}

/* 2 */
let obj2 = Object.create({})
obj2.int = 4
obj2.string = "hola"
console.log(obj2)

/* 3 */
let propNames = Object.getOwnPropertyNames(obj2)
console.log(propNames)

/* 4 */
let prototype = Object.getPrototypeOf(obj2)
console.log(Object.getOwnPropertyNames(prototype))

/* 5 */
/* already had obj1 and obj2 so I changed them to objj1 and objj2 */
obj1 = {}
obj1.x = 1
obj2 = Object.create(obj1)
obj2.y = 2
let obj3 = Object.create(obj2)
obj3.z = 3
console.log(obj3.z + ", " + obj3.y + ", " +obj3.x)


/* 6 */
for (prop in obj3) {
    console.log(prop + ": " + obj3[prop])
}

/* 7 */
console.log(obj3.hasOwnProperty("x"))
console.log(obj3.hasOwnProperty("y"))


/* 8 */
console.log(obj3.propertyIsEnumerable("x"))
console.log(obj3.propertyIsEnumerable("y"))

/* 9 */
console.log(Object.keys(obj3))

/* 10 */
let target = { x: 2, y: 4 }
let source = { w: 6, z: 8 }

for (let prop of Object.keys(source)) {
    target[prop] = source[prop]
}

console.log(target)

target = { x: 2, y: 4 }

target = { ...source, ...target }
console.log(target)


/* 11 */
console.log(JSON.stringify(obj3)) /*inherited properties not included*/

/* 12 */
const json = '{"result":true, "count":50}';
const objectJ = JSON.parse(json); 
console.log(objectJ)

/* 13 */
let person = {
    name: "Sarah Miller",
    age: "44"
}
person.toString = () => { return person.name + ", " + person.age; }
console.log(person.toString())

/* 14 */
const a = 'foo';
const b = 42;
const c = {};
let o = { a: a, b: b, c: c };
console.log(o)

/* 15 */
let position = { x:0, y: 0}
let dimensions = {width: 100, height: 75}
let rect = {...position, ...dimensions}
console.log(rect)

/* 16 */
let p = {
    x : 1.0,
    y : 1.0,
    get r() { return Math.hypot(this.x, this.y);},
    set r(newValue){
        let oldValue = Math.hypot(this.x, this.y);
        let ratio = newValue/oldValue;
        this.x *= ratio;
        this.y *= ratio;
    }
}
console.log(p.r)