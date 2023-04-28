import express from "express";
import multer from "multer";
import fs from "fs";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
