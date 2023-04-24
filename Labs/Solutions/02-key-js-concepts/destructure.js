const assert = require("assert");

function getAddress() {
  return {
    city: "Dundrum",
    county: "Down",
    postcode: "BT33",
    coords: {
      lat: 54.2583,
      long: -5.8824,
    },
  };
}

function getNumbers() {
  return [1, 2, 3, 4, 5, 6];
}

function getNestedNumbers() {
  return [7, 4, [3, 4, [5, 6]]];
}

// Using destructuring, call `getAddress()` and create a 'city', 'state' and 'zip' variable.

const { city, county, postcode } = getAddress();

assert.equal(city, "Dundrum");
assert.equal(county, "Down");
assert.equal(postcode, "BT33");

console.log("Address tests passed.");

// Call getNumbers and pull the first value out as `one`, the second as `two` and the third as `three`

const [one, two, third] = getNumbers();

assert.equal(one, 1);
assert.equal(two, 2);
assert.equal(third, 3);

console.log("getNumbers test passed.");

// Call getNestedNumbers and pull the first value out as `seven`, the four as `four` and 6 as `six`.

const [seven, four, [, , [, six]]] = getNestedNumbers();

assert.equal(seven, 7);
assert.equal(four, 4);
assert.equal(six, 6);

console.log("getNestedNumbers tests passed.");
console.log("All passed. Well done!");
