import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

async function connectToDB() {
  try {
    const db = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    return db;
  } catch (error) {
    console.log(error);
  }
}

export default connectToDB();

// process.env.DB_CONNECTION_STRING
// mongodb://127.0.0.1/my_database
