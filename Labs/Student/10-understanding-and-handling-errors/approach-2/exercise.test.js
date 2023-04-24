"use strict";

import {
  wrapTryCatch,
  combineAndPrint,
  combinedLength,
  sumArray,
} from "./exercise";

test("combinedLength :: valid arguments", () => {
  expect(combinedLength([], [])).toBe(0);
  expect(combinedLength([], [1])).toBe(1);
  expect(combinedLength([1], [])).toBe(1);
  expect(combinedLength([1, 2, 3], [1, 2, 3, 4])).toBe(7);
});

test("combinedLength :: invalid arguments", () => {
  expect(() => combinedLength()).toThrowError(TypeError);
  expect(() => combinedLength(1)).toThrowError(TypeError);
  expect(() => combinedLength(1, {})).toThrowError(TypeError);
  expect(() => combinedLength(1, {})).toThrowError(TypeError);
  expect(() => combinedLength({}, [])).toThrowError(TypeError);
  expect(() => combinedLength("", [])).toThrowError(TypeError);
});

test("sumArray :: valid arguments", () => {
  expect(sumArray([])).toBe(0);
  expect(sumArray([1])).toBe(1);
  expect(sumArray([1, 2, 3])).toBe(6);
  expect(sumArray([-1, -2, 3])).toBe(0);
});

test("sumArray :: invalid arguments", () => {
  expect(() => sumArray()).toThrowError(TypeError);
  expect(() => sumArray(1)).toThrowError(TypeError);
  expect(() => sumArray({})).toThrowError(TypeError);
  expect(() => sumArray("")).toThrowError(TypeError);
  expect(() => sumArray(true)).toThrowError(TypeError);
  expect(() => sumArray(["", 2])).toThrowError(TypeError);
  expect(() => sumArray([1, "", true])).toThrowError(TypeError);
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
  expect(combineAndPrint([], [1])).toBe(
    "Combined length: 1; Combined sum of elements: 1"
  );
  expect(combineAndPrint([1, 2, 3], [1, 2, 3, 4])).toBe(
    "Combined length: 7; Combined sum of elements: 16"
  );
});

test("combineAndPrint :: invalid arguments", () => {
  expect(() => combineAndPrint()).toThrowError(
    "Invalid arguments: both arguments must be arrays"
  );
  expect(() => combineAndPrint(1)).toThrowError(
    "Invalid arguments: both arguments must be arrays"
  );
  expect(() => combineAndPrint(1, {})).toThrowError(
    "Invalid arguments: both arguments must be arrays"
  );
  expect(() => combineAndPrint([], {})).toThrowError(
    "Invalid arguments: both arguments must be arrays"
  );
  expect(() => combineAndPrint("", [])).toThrowError(
    "Invalid arguments: both arguments must be arrays"
  );
});

test("wrapTryCatch :: valid arguments", () => {
  const fn = wrapTryCatch(combinedLength);
  expect(fn([], [])).toBe(0);
  expect(fn([1], [])).toBe(1);
  expect(fn([], [1])).toBe(1);
  expect(fn([1, 2, 3], [1, 2, 3, 4])).toBe(7);
});

test("wrapTryCatch :: invalid arguments", () => {
  const fn = wrapTryCatch(combinedLength);
  expect(fn()).toBe(undefined);
  expect(fn(1)).toBe(undefined);
  expect(fn(1, {})).toBe(undefined);
  expect(fn({}, [])).toBe(undefined);
});
