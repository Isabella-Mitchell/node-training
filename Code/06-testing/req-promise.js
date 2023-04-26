const { setTimeout } = require("timers/promises");

async function fakeFetch(url) {
  await setTimeout(300);
  if (url === "http://error.com") throw Error("network error");
  return Buffer.from("some data");
}

module.exports = fakeFetch;
