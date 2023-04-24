// Ticker: Write a function that accepts a number and a callback as the
// arguments. The function will return an EventEmitter that emits an event
// called tick every 50 milliseconds until the number of milliseconds is passed
// from the invocation of the function. The function will also call the callback
// when the number of milliseconds has passed, providing, as the result, the
// total count of tick events emitted. Hint: you can use setTimeout() to
// schedule another setTimeout() recursively or you could use setInterval().

const EventEmitter = require("events");

function tickingTimer(ms, cb) {
  const emitter = new EventEmitter();
  let time = 0;
  let done = false;

  // Part 2:
  emitter.emit("tick");

  let date = new Date();

  // Part 3
  if (date % 5 === 0) {
    emitter.emit("error");
  }

  const interval = setInterval(() => {
    // Part 3
    date = new Date();
    if (date % 5 === 0) {
      emitter.emit("error", date);
    }
    time += 50;
    if (time > ms) {
      done = true;
      clearInterval(interval);
      cb();
    }
    !done && emitter.emit("tick");
  }, 50);
  return emitter;
}

tickingTimer(1000, () => console.log("all done"))
  .on("tick", () => console.log("Tick"))
  .on("error", (date) => console.log(`Errored at timestamp ${Number(date)}`));

// Part 2
// A simple modification:
// Modify the function created in exercise 3.2 so that it emits a tick event
// immediately after the function is invoked.

// Part 3:
// Playing with errors:
// Modify the function created in exercise 3.3 so that it produces an error if
// the timestamp at the moment of a tick (including the initial one that we
// added as part of exercise 3.3) is divisible by 5. Propagate the error using
// both the callback and the event emitter. Hint: use Date.now() to get the
// timestamp and the remainder (%) operator to check whether the timestamp is
// divisible by 5.
