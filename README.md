https://github.com/programming-hero-web-course-4/b12a6-green-earth-Monir312.git


leafy-paprenjak-1f0e34.netlify.app


1) Difference between var, let, and const:

var: Old way to declare a variable. Function-scoped, can be redeclared and updated.

let: Block-scoped (inside {}), can be updated but not redeclared in the same scope.

const: Block-scoped, cannot be updated or redeclared. Must be initialized when declared.


2) Difference between map(), forEach(), and filter():

forEach(): Loops through an array. Does not return anything.

map(): Loops through an array and returns a new array after modifying elements.

filter(): Loops through an array and returns a new array with elements that pass a condition.

const numbers = [1, 2, 3, 4];

// forEach
numbers.forEach(n => console.log(n)); // prints each number

// map
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]

// filter
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]


3) Arrow functions in ES6:

Shorter way to write functions using =>.
Automatically binds this from its surrounding scope.

Example:

// Normal function
function add(a, b) { return a + b; }

// Arrow function
const add = (a, b) => a + b;


4) Destructuring assignment in ES6:

Extract values from arrays or objects into variables easily.

Example:

// Array
const arr = [1, 2];
const [a, b] = arr; // a=1, b=2

// Object
const obj = {name: "John", age: 25};
const {name, age} = obj; // name="John", age=25



5) Template literals in ES6:

Strings wrapped in backticks ` instead of quotes.
Can include variables and expressions using ${}.
Easier than normal string concatenation.

Example:

const name = "Alice";
const age = 25;

// Old way
const str1 = "My name is " + name + " and I am " + age + " years old.";

// Template literal
const str2 = `My name is ${name} and I am ${age} years old.`; 