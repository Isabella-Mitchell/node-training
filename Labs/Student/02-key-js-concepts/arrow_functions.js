const assert = require("assert");

const nums = [2, 5, 10];
// Replace the 'function' in this 'map' call with an arrow function.
// Hint: you shouldn't have any braces or 'return' after you are done

const squares = nums.map((num) => num * num);

assert.equal(squares.shift(), 4);
assert.equal(squares.shift(), 25);
assert.equal(squares.shift(), 100);
console.log("All passed!");
