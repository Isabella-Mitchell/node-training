const filterBiggestNumbers = require("./filterBiggest");

// Exercise 5
test("Will throw if the first parameter is not an array", () => {
  expect(() => filterBiggestNumbers("I'm not an array", 0)).toThrowError(
    "The first argument must be an array"
  );
});

test("Will return correct output for reasonable input", () => {
  // ✅ Create a test array
  // ✅ Capture your results
  // ✅ Create an array for all of the expected values
  // ✅ Create an array for all of the reject values
  // ✅ Iterate over last two arrays to confirm that the result array has/doesn't have those values
  const testArray = [1, 2, 3];
  const myResults = filterBiggestNumbers(testArray, 2);
  const myExpectedResults = [3];
  const myRejectedResults = [1, 2];
  expect(myResults).toContain = myExpectedResults;
  expect(myResults).not.toContain = myRejectedResults;
});

test("Will throw if the second argument is not a number", () => {
  expect(() => filterBiggestNumbers([1, 2, 3], "string")).toThrowError(
    "The second argument must be a number"
  );
});

test("Will work if the second number not an integer", () => {
  expect(filterBiggestNumbers([1, 2, 3], 2.3)).toEqual([3]);
});

test("Will work if the min is a negative number", () => {
  expect(filterBiggestNumbers([1, 2, 3], -1)).toEqual([1, 2, 3]);
});
