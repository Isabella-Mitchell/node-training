import mongoose from "mongoose";

/**
 * 2. create the 'Book' model following the schema requirements
 *
 * The schema should have the following properties:
 *
 * 2.1 title:
 *    2.1.1 required, error message of: "The title is required"
 *    2.1.2 string
 *    2.1.3 trim
 *
 * 2.2 author:
 *    2.2.1 required, error message of: "The author is required"
 *    2.2.2 string
 *    2.2.3 trim
 *
 * 2.3 publishDate:
 *    2.3.1 required, error message of: "The email is required"
 *    2.3.2 Date
 *
 * 2.4 rating:
 *    2.4.1 optional
 *    2.4.2 number

 * 2.5 with the "createdAt" and "updatedAt" properties that are created automatically
 */

const BookSchema = new mongoose.Schema({});

const BookModel = new mongoose.model("book", BookSchema);

export default BookModel;
