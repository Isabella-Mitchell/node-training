function loadAndParseStore() {
  // TODO: Open the store from the file system
  // TODO: Parse as a JS object
  // TODO: return
}

function getInitialId(store) {
  // TODO: Use the store to find the highest id and return this.
}

function createBook(book) {
  book.id = ++id;
  store = [...store, book];
  return true;
}

async function persistStore(store) {
  // TODO: Persist store to the filesystem.
}

let store = loadAndParseStore();
const id = getInitialId(store);

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

persistStore(store);
