"use strict";

let greeter = "Hello!";

console.log(greeter);

if (true) {
  let greeter = "You look great!";
  console.log(greeter);
}
// Primitives
// String
// Number (0, 0.121, 13123)
// BigInt
// Symbol - what is it?
// Boolean
// null
// undefined

{
  let name = "Kevin";
  let newName = name;
  newName = newName.toUpperCase();

  console.log(newName);
  console.log(name);
}

{
  let numbers = [];
  numbers.push(10);

  let newNumbers = numbers;

  console.log(newNumbers);
  console.log(numbers);

  newNumbers.push(101);

  console.log(newNumbers);
  console.log(numbers);

  console.log(numbers.length);
}
// Non-primitive data type
// Object:
// Array (an object)
// Object
// Class
// Function
// ...
