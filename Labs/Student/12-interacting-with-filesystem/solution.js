const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");

async function loadAndParseStore() {
  const contents = await readFile("./store.json");
  return JSON.parse(contents.toString());
}

function getInitialId(store) {
  return store.reduce((a, c) => Math.max(a, c.id), 0);
}

function createBook(book) {
  book.id = ++id;
  store = [...store, book];
  persistStore();
  return true;
}

async function persistStore() {
  return writeFile(join(__dirname, "store.json"), JSON.stringify(store));
}

let id;
let store;
async function run() {
  store = await loadAndParseStore();
  id = getInitialId(store);
  createBook({
    title: "The Lord of the Rings",
    author: "JRR Tolkein",
  });

  createBook({
    title: "Dogs of War",
    author: "Adrian Tchaikovsky",
  });

  createBook({
    title: "Dune",
    author: "Frank Herbert",
  });

  await persistStore(store);

  console.log("All done.");
}

run();
