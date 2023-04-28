const add = require("./add");

// Exercise 1
test("Test that add returns the correct result from two numbers", () => {
  // ✅ Use the add function to add two numbers
  // ✅ Expect the value toBe the right value
  expect(add(5, 5)).toBe(10);
});

// Exercise 2
test("Test that the add works with negative numbers", () => {
  // ✅ Use the add function to add two numbers with at least one of them negative
  // ✅ Expect the value toBe the right value
  expect(add(-5, -5)).toBe(-10);
});

// Exercise 3
test("Test that there will be an error if you pass in non-numbers", () => {
  // ✅ Use the add function to add two values with at least one of them not a number
  // ✅ Expect the function to throw
  expect(() => add("string", "5")).toThrowError(
    Error("You need to pass in numbers.")
  );
});
