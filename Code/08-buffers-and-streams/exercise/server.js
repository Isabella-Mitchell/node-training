const express = require("express");
const multer = require("multer");
const fs = require("fs");
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

app.post(
  "/upload",
  upload.single("file"),

  (req, res) => {
    res.send("File uploaded successfully");
  }
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
