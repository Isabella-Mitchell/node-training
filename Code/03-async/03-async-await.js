const { readFile } = require("fs/promises");

async function getData() {
  const data = await readFile("other.txt");
  console.log(data.toString());
}

console.log(getData());
