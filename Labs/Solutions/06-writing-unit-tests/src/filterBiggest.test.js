const filterBiggestNumbers = require("./filterBiggest");

// Exercise 5
test("Will throw if the first parameter is not an array", () => {
  expect(() => filterBiggestNumbers({})).toThrowError();
});

test("Will return correct output for reasonable input", () => {
  const testInput = [4, 2, 5, 3, 7, 8, 10, 12];
  const got = filterBiggestNumbers(testInput, 7);
  const want = [8, 10, 12];
  const rejects = [4, 2, 5, 3, 6];

  want.forEach((value) => expect(got).toContain(value));
  rejects.forEach((value) => expect(got).not.toContain(value));
});

test("Will throw if the second argument is not a number", () => {
  expect(() => filterBiggestNumbers([], "")).toThrowError();
});

test("Will work if the second number not an integer", () => {
  const testInput = [4, 2, 5];
  const got = filterBiggestNumbers(testInput, 4.5);
  const want = [5];
  const rejects = [4, 2];

  want.forEach((value) => expect(got).toContain(value));
  rejects.forEach((value) => expect(got).not.toContain(value));
});

test("Will work if the min is a negative number", () => {
  const testInput = [-4, 4, 2, 5];
  const got = filterBiggestNumbers(testInput, -1);
  const want = [2, 4, 5];
  const rejects = [-4];

  want.forEach((value) => expect(got).toContain(value));
  rejects.forEach((value) => expect(got).not.toContain(value));
});
