//Destructing object
let address ={
    street: "Julian Street",
    city: "San Jose",
    state: "California"
}

const {city, state} = address;
console.log(`My city is ${city}`);
console.log('My state is ' + state);


// Destructing array
let arr = ["aa","bb","cc","dd","ee"];
let [ first ] = arr;
console.log(first);

let [one, two, ...rest] = arr;
console.log(one);
console.log(two);
console.log(rest);

// for of loop
let notes = [10, 20 ,30]
let total = 0;
for(const note of notes){
    total +=note
};
console.log(total)

// spread operator
let child1 = { name: "Leo" };
let child2 = {...child1, age:10};

console.log(child1);
console.log(child2);

//rest operator
function student(name){
    console.log("All students names without rest operator",name);
}

function students(...name){
    console.log("All Student names with rest operator", name);
}

student("Alex","Bob");
students("Alex","Bob");

//arrow vs traditional 
function traditional(name)
{
    console.log(name);
}
traditional("cmpe273");

var traditional = function(name){
    console.log(name);
}
let myvalue = traditional("cmpe273");

var arrow = name => {
    console.log(name);
}
arrow("cmpe273");

 // this in arrow vs this in traditional
function Traditional(){
    let value=10;
    let temp = function() {
        console.log(`Traditional function value: ${value}`);
    }
    temp();
}
var traditional = new Traditional();

function Arrow(){
    this.value=10;
    let temp = () => {
        console.log(`Arrow function value:${this.value}`);
    }
    temp();
}
var arrow = new Arrow();


//Diff between let , var and const

//var scope - Error
var greeter = "hey hi";

function newFunction() {
    var hello = "hello";
    console.log(greeter)
}
console.log(hello);


//var redefined
var greeter = "hey hi";
var greeter = "say Hello instead";

// problem with var
var greeter = "hey hi";
var times = 4;

if (times > 3) {
    var greeter = "say Hello instead"; 
}

console.log(greeter) //"say Hello instead"

//let

let greeter = "hey hi";
let times = 4;

if (times > 3) {
    let greeter = "say Hello instead"; 
}

console.log(greeter) //"say Hello instead"

//const

const temp = 10;
temp = 100;

const obj = {};
obj.name = "cmpe273";
console.log(obj)

const arr = [];
arr.push(10);
console.log(arr)

//padStart and padEnd
let str = "cmpe"
console.log(str.padStart(10,'$'));
console.log(str.padEnd(10,'$'));

// how async works?
const students = [
    {name: "Chandler", year: 2},
    {name: "Joey", year: 2}
];

function getStudents(){
    setTimeout(() => {
        console.log(students[2]);
    }, 1000);
}

function createStudent(){
    setTimeout(() => {
        students.push({name: "new name", year: 1})
        console.log("Student added");
    }, 5000);
}

createStudent();
getStudents();

//callback
const students = [
    {name: "Chandler", year: 2},
    {name: "Joey", year: 2}
]

function getStudents(){
    setTimeout(()=>{
        console.log(students[2]);
    },1000);
}

function createStudent(xyz){
    setTimeout(() => {
        students.push({name: "Ross", year: 1})
        xyz();
    }, 5000);
}

createStudent(getStudents);

//Promises
const students =[
    {name: "Chandler", year: 2},
    {name: "Joey", year: 2}
]

function getStudents(){
    setTimeout(()=>{
        console.log(students);
    },1000);
}

function createStudent(callback){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            students.push({name: "new name", year: 1})
            const err = false;
    
            if(!err) {
                resolve();
            } else {
                reject('Something went wrong');
            }
    
        },5000);
    }); 
}

createStudent().then(getStudents);

const promise1 = Promise.resolve();
const promise2 = 20;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'done!');
});

Promise.all([promise1, promise2, promise3]).then(values=> console.log(values));

// Async and await

const students =[
    {name: "Chandler", year: 2},
    {name: "Joey", year: 2}
]

function getStudents(){
    setTimeout(()=>{
        console.log(students);
    }, 1000);
}

function createStudent(callback){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            students.push({name: "new name", year: 1})
            const err = false;
    
            if(!err){
                resolve();
            }else{
                reject('Something went wrong');
            }
        }, 5000);
    }); 
}

async function test(){
    await createStudent();
    getStudents();
}

test();

//Closure

function outer(){
    let outerVariable = 5;

    function inner(){
        console.log(`Value of outer variable is: ${outerVariable}`);
    }
    return inner;
}

let test = outer();
test();

//call and apply
obj = {name: "Monica"};
function displayNameAndAsset(asset1, asset2) {
    let totalAsset= asset1 + asset2;
    console.log(`Name is ${this.name} and asset is ${totalAsset}`);
}

displayNameAndAsset.call(obj,1,2);

obj = {name: "Monica"};
function displayNameAndAsset(asset1, asset2){
    let totalAsset= asset1+asset2;
    console.log(`Name is ${this.name} and asset is ${totalAsset} `);
}

let assetArray = [1,2];
displayNameAndAsset.apply(obj, assetArray);


//bind
obj = {name:"Monica"};
function displayNameAndAsset(asset1, asset2){
    let totalAsset = asset1 + asset2;
    console.log(`Name is ${this.name} and asset is ${totalAsset} `);
}

console.log(displayNameAndAsset.bind(obj,1,2));

var bound = displayNameAndAsset.bind(obj)
bound(1,2);

//older way of declaring objects 
function Student(name, year){
    this.name=name;
    this.year=year;
}

let student1 = new Student("Rachel", 2);
console.log(student1);

// prototype
function Student(name, year){
    this.name=name;
    this.year=year;
}

Student.prototype.printName=function(){
    console.log(`Name of the Student is ${this.name}`);
    this.newProps = "A new property";
}

let student1 = new Student("Rachel", 2);
student1.printName();


//Prototype inheritance
function Student(name, year){
    this.name=name;
    this.year=year;
}

Student.prototype.printName=function(){
    console.log(`Name of the Student is ${this.name}`);
    this.newProps = "A new property";
}

function TA(name, year, salary){
    Student.call(this,name, year);
    this.salary=salary;
}

let ta = new TA("Ross", 2, 10);

console.log(ta);
TA.printName();

// using Object.create()

function Student(name, year){
    this.name=name;
    this.year=year;
}

Student.prototype.printName=function(){
    console.log(`Name of the Student is ${this.name}`);
    this.newProps="A new property";
}

function TA(name, year, salary){
    Student.call(this,name, year);
    this.salary=salary;
}

TA.prototype = Object.create(Student.prototype);

let ta=new TA("Ross", 2,10);

console.log(ta);
ta.printName();

//class 

class Student{
    constructor(name, year){
        this.name=name;
        this.year=year;
    }

    printName(){
        console.log(`Student name is ${this.name}`);
    }
}

let student =new Student("Ross", 2);
console.log(student);