const add = require("./add");

// Exercise 1
test("Test that add returns the correct result from two numbers", () => {
  // ✅ Use the add function to add two numbers
  // ✅ Expect the value toBe the right value
  expect(add(2, 3)).toBe(5);
});

// Exercise 2
test("Test that the add works with negative numbers", () => {
  // ✅ Use the add function to add two numbers with at least one of them negative
  // ✅ Expect the value toBe the right value
  expect(add(-1, -3)).toBe(-4);
});

// Exercise 3
test("Test that there will be an error if you pass in non-numbers", () => {
  // ✅ Use the add function to add two values with at least one of them not a number
  // ✅ Expect the function to throw
  expect(() => add(1, "1")).toThrowError();
  expect(() => add(true, 2)).toThrowError();
  expect(() => add([], {})).toThrowError();
});
