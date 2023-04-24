import { returnError, NewError } from "./exercise.js";

test("NewError", () => {
  const errMsg = "This is a test error message.";
  const error = new NewError(errMsg);

  expect(error.code).toBe("ERR_CUSTOM_ERROR");
  expect(error.name).toBe("CUSTOM_ERROR");
  expect(error.message).toBe(errMsg);
  expect(error).toBeInstanceOf(Error);
});

test("returnError", () => {
  const got = returnError();

  expect(got).toBeInstanceOf(Error);
  expect(got.code).toBe("ERR_RETURNED_ERROR");
});
