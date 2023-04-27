import Book from "../models/Book.js";

let books = [
  { id: 1, author: "John Scalzi", title: "Old Man's War" },
  { id: 2, author: "Mary Robinette Kowal", title: "The Calculating Stars" },
];

let nextId = 3;

export async function getAllBooks(req, res, next) {
  const { author } = req.query;
  try {
    let results;
    if (author) {
      results = await Book.find();
    } else {
      results = await Book.find();
    }
    return res.json(results);
  } catch (error) {
    next(err);
  }
}
//   const { author } = req.query;
//   if (author) {
//     res.json(
//       books.filter((book) =>
//         book.author.toLowerCase().includes(author.toLowerCase())
//       )
//     );
//   } else {
//     res.json(books);
//   }
// }

export async function getSingleBook(req, res, next) {
  try {
    const result = await Book.findById(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Couldn't find record with that id" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function createBook(req, res) {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    next(err);
  }
}

export async function updateBook(req, res) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!book) {
    return res
      .status(404)
      .json({ message: "Couldn't find record with that id" });
  }

  res.json(book);
}

export async function deleteBook(req, res) {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res
      .status(404)
      .json({ message: "Couldn't delete a book with that id" });
  }
  res.status(204).send();
}
