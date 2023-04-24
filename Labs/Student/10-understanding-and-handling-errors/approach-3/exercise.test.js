"use strict";

import {
  wrapErrorCheck,
  combineAndPrint,
  combinedLength,
  sumArray,
} from "./exercise";

test("combinedLength :: valid arguments", () => {
  expect(combinedLength([], [])).toBe(0);
  expect(combinedLength([1], [])).toBe(1);
  expect(combinedLength([], [1])).toBe(1);
  expect(combinedLength([1, 2, 3], [1, 2, 3, 4])).toBe(7);
});

test("combinedLength :: invalid arguments", () => {
  expect(combinedLength()).toBeInstanceOf(TypeError);
  expect(combinedLength(1)).toBeInstanceOf(TypeError);
  expect(combinedLength(1, {})).toBeInstanceOf(TypeError);
  expect(combinedLength([], {})).toBeInstanceOf(TypeError);
  expect(combinedLength("", {})).toBeInstanceOf(TypeError);
});

test("sumArray :: valid arguments", () => {
  expect(sumArray([])).toBe(0);
  expect(sumArray([1])).toBe(1);
  expect(sumArray([1, 2, 3])).toBe(6);
  expect(sumArray([-1, -2, 3])).toBe(0);
});

test("sumArray :: invalid arguments", () => {
  expect(sumArray()).toBeInstanceOf(TypeError);
  expect(sumArray(1)).toBeInstanceOf(TypeError);
  expect(sumArray({})).toBeInstanceOf(TypeError);
  expect(sumArray("")).toBeInstanceOf(TypeError);
  expect(sumArray("true")).toBeInstanceOf(TypeError);
  expect(sumArray(["", true])).toBeInstanceOf(TypeError);
  expect(sumArray([1, [], {}])).toBeInstanceOf(TypeError);
});

test("combineAndPrint :: valid arguments", () => {
  expect(combineAndPrint([], [])).toBe(
    "Combined length: 0; Combined sum of elements: 0"
  );
  expect(combineAndPrint([1], [])).toBe(
    "Combined length: 1; Combined sum of elements: 1"
  );
  expect(combineAndPrint([], [1])).toBe(
    "Combined length: 1; Combined sum of elements: 1"
  );
  expect(combineAndPrint([1, 2, 3], [1, 2, 3, 4])).toBe(
    "Combined length: 7; Combined sum of elements: 16"
  );
});

test("combineAndPrint :: invalid arguments", () => {
  expect(combineAndPrint()).toBeInstanceOf(TypeError);
  expect(combineAndPrint(1)).toBeInstanceOf(TypeError);
  expect(combineAndPrint({}, [])).toBeInstanceOf(TypeError);
  expect(combineAndPrint([], {})).toBeInstanceOf(TypeError);
  expect(combineAndPrint("", [])).toBeInstanceOf(TypeError);
});

test("wrapErrorCheck :: valid arguments", () => {
  const fn = wrapErrorCheck(combinedLength);

  expect(fn([], [])).toBe(0);
  expect(fn([1], [])).toBe(1);
  expect(fn([], [1])).toBe(1);
  expect(fn([1, 2, 3], [1, 2, 3, 4])).toBe(7);
});

test("wrapErrorCheck :: invalid arguments", () => {
  const fn = wrapErrorCheck(combinedLength);
  expect(fn()).toBe(undefined);
  expect(fn(1)).toBe(undefined);
  expect(fn({}, [])).toBe(undefined);
  expect(fn([], {})).toBe(undefined);
  expect(fn("", [])).toBe(undefined);
});
