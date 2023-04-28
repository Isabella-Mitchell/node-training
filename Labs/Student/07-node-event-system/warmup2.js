"use strict";
const { EventEmitter } = require("events");

process.nextTick(console.log, "passed!");
process.stdin.resume();
const ee = new EventEmitter();

ee.on("error", (err) => {
  console.log("got error:", err.message);
});

ee.emit("error", Error("timeout"));
