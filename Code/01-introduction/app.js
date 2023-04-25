console.log("I am app.js!");

function eventuallyThrowAnError(n) {
  if (n === 0) {
    throw new Error("I was wrong, sorry!");
  }
  eventuallyThrowAnError(n - 1);
}

eventuallyThrowAnError(100);
