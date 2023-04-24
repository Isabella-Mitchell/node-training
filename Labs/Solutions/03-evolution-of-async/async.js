const util = require("util");
const fs = require("fs");
const { setTimeout } = require("timers/promises");
const readFile = util.promisify(fs.readFile);

// const files = ["./support/demofile.txt", "./support/demofile.other.txt"];

// let promises = files.map((name) => readFile(name, { encoding: "utf8" }));
// Promise.all(promises).then((values) => {
//   console.log(values);
// });

const urls = [
  "https://swapi.dev/api/people",
  "https://pokeapi.co/api/v2/pokemon/ditto",
];

// Use fetch and promise all or allSettled to get the data from the URLs in parallel ...

async function getData(urls) {
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data = await Promise.all(
    responses.map((response) => (response.ok ? response.json() : null))
  );
  console.log(data);
}

// getData(urls);

async function getData2(urls) {
  const responses = await Promise.allSettled(urls.map((url) => fetch(url)));
  const errors = responses.filter(({ status }) => status === "rejected");
  const notOk = responses.filter((response) => !response.value.ok);
  const okResponses = responses.filter((response) => response.value.ok);
  const data = await Promise.allSettled(
    okResponses.map((response) => response.value.json())
  );
  errors.push(...data.filter(({ status }) => status === "rejected"));
  console.log(data);
  console.log(errors);
  console.log(notOk);
}

// getData2(urls);

async function getData3(urls, signal) {
  try {
    const responses = await Promise.all(
      urls.map((url) => fetch(url, { signal }))
    );
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    console.log(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("The fetch was aborted.");
    }
  }
}

const ac = new AbortController();
getData3(urls, ac.signal);

setTimeout(1, ac.abort());
