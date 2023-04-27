let books = [
  { id: 1, author: "John Scalzi", title: "Old Man's War" },
  { id: 2, author: "Mary Robinette Kowal", title: "The Calculating Stars" },
];

let nextId = 3;

export function getAllBooks(req, res) {
  const { author } = req.query;

  if (author) {
    res.json(
      books.filter((book) =>
        book.author.toLowerCase().includes(author.toLowerCase())
      )
    );
  } else {
    res.json(books);
  }
}

export function getSingleBook(req, res) {
  const { id } = req.params;
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return res
      .status(404)
      .json({ message: "We couldn't find a book with that id", error: true });
  }

  res.json(book);
}

export function createBook(req, res) {
  const book = req.body;
  book.id = nextId++; // NO VALIDATION!!!!
  books.push(book);
  res.json(book);
}

export function updateBook(req, res) {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex < 0) {
    return res
      .status(404)
      .json({ message: "We couldn't find a book with that id", error: true });
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  res.json(books[bookIndex]);
}

export function deleteBook(req, res) {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex < 0) {
    return res
      .status(404)
      .json({ message: "We couldn't find a book with that id", error: true });
  }
  books.splice(bookIndex, 1);
  res.status(204).send();
}
