const { readFile } = require("fs/promises");

async function getData() {
  // new Promise()
  const data = await readFile("other.txt"); // .then()
  console.log(data.toString());
  if (false) {
    throw new Error(); // reject
  }
  return; // resolve
}

console.log(getData());
