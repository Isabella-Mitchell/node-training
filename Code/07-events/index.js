/**
 * Things that emit events (event emitters)
 * Things to listen to events and respond to them
 */
// A record has changed
// A user has done something ...

const { EventEmitter } = require("node:events");

const ee = new EventEmitter();

let total = 0;

ee.on("task-achieved", () => {
  console.log(`Well done for doing something! Keep going!`);
});

const incrementRating = (task, rating) => {
  total += rating;
  console.log(`Well done for doing that task (${task})!`);
  console.log(`You got ${rating} extra points and your total is now ${total}`);
};

ee.on("task-achieved", incrementRating);

ee.prependListener("task-achieved", () => {
  console.log("I was called first!");
});

ee.prependListener("task-achieved", () => {
  console.log("🏆 No, I was called first - haha!");
});

// ee.removeAllListeners();

ee.prependOnceListener("task-achieved", () => {
  console.log(
    "You should be intrinsically motivated - stop looking for points!"
  );
});

ee.on("error", (error) => {
  console.error(`🚨${error}🚨`);
});

ee.emit("task-achieved", "Cook lunch", 5);

ee.removeListener("task-achieved", incrementRating);

ee.emit("task-achieved", "Made coffee", 3);
ee.emit("task-achieved", "Wrote this code", 2);

ee.emit("i-like-aikido");
ee.emit("star-trek-picard-was-fun");
ee.emit("error", "Lots of errors!");
