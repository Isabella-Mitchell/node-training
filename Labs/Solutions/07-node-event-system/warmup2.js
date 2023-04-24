"use strict";
const { EventEmitter } = require("events");

process.nextTick(console.log, "passed!");
process.stdin.resume();
const ee = new EventEmitter();

ee.on("error", (err) => console.log(err));
ee.emit("error", Error("timeout"));
