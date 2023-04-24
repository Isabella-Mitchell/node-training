let store = [{ name: "Lion, Witch and the Wardrobe", id: 1 }];

let id = 1;

async function getAllBooks() {
  return store;
}

async function getBookById(id) {
  return store.filter((book) => book.id === id)[0] || null;
}

async function createBook(book) {
  book.id = ++id;
  store = [...store, book];
  return true;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
