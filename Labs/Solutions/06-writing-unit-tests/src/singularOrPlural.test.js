const getSinguralOrPlural = require("./singularOrPlural");

// Exercise 4
test("Will return singular for value of 1", () => {
  expect(getSinguralOrPlural(1, "man", "men")).toEqual("man");
});

test("Will return plural for value of 0", () => {
  expect(getSinguralOrPlural(0, "man", "men")).toEqual("men");
});

test("Will throw for a negative", () => {
  expect(() => getSinguralOrPlural(-1, "man", "men")).toThrow();
});

test("Will throw for a non-numeric value", () => {
  expect(() => getSinguralOrPlural([], "man", "men")).toThrow();
});
