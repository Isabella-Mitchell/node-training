const assert = require("assert");

// Create an Animal class with a constructor
// Make your class default (using default params) the name to 'Honey Badger'

class Animal {
  constructor(name) {
    this.name = name || "Honey Badger";
  }
}

const animal = new Animal();
const dog = new Animal("Dog");

assert.equal(animal.name, "Honey Badger");
assert.equal(dog.name, "Dog");
console.log("All done!");
