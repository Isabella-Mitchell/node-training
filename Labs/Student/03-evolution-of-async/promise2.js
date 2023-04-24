const fs = require("fs");
const zlib = require("zlib");

// Load a file from disk using readFile and then compress it using the async 
// zlib node library, use a promise chain to process this work.


// TODO: Convert this to a Promise based function
function zlibPromise(data) {
  zlib.gzip(data, (error, result) => {
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// TODO: Load the file, zip it and then print it to the screen.
readFile("./support/demofile.txt", "utf-8")
    .then(...) // --> Load it then zip it and then print it to screen
});