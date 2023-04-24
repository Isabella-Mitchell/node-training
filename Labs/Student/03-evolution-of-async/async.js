const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./support/demofile.txt", "./support/demofile.other.txt"];

let promises = files.map((name) => readFile(name, { encoding: "utf8" }));
Promise.all(promises).then((values) => {
  // <-- Uses .all
  console.log(values);
});

const url = [
  "https://swapi.dev/api/people",
  "https://pokeapi.co/api/v2/pokemon/ditto",
];

// Use fetch and promise all or allSettled to get the data from the URLs in parallel ...

async function test() {
  const data = await Promise.all();
}

// and then log it out when successful
//
