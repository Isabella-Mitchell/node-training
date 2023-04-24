// 1. Give this error a code of ERR_CUSTOM_ERROR
// 2. Give it a name of "CUSTOM_ERROR"
export class NewError extends Error {
  code = "ERR_CUSTOM_ERROR";

  get name() {
    return "CUSTOM_ERROR";
  }
  // CODE HERE
}

// Have this function return an error that has an error code of
// ERR_RETURNED_ERROR
export function returnError() {
  const err = new Error();
  err.code = "ERR_RETURNED_ERROR";
  return err;
  // Code here
  return Error(); // Delete this
}
