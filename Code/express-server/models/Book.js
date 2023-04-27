import mongoose from "mongoose";

// create a schema
const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    description: String,
  },
  { strict: false }
);

// instantiate a model
const Book = mongoose.model("Book", bookSchema);

// export the model
export default Book;
