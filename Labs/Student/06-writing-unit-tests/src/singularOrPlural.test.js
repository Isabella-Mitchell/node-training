const getSinguralOrPlural = require("./singularOrPlural");

// Exercise 4
test("Will return singular for value of 1", () => {
  expect(getSinguralOrPlural(1, "woman", "women")).toBe("woman");
});
test("Will return plural for value of 0", () => {
  expect(getSinguralOrPlural(0, "woman", "women")).toBe("women");
});

test("Will throw for a negative", () => {
  expect(() => getSinguralOrPlural(-1, "woman", "women")).toThrowError(
    "The first parameter needs to be a number 0 or higher"
  );
});

test("Will throw for a non-numeric value", () => {});
