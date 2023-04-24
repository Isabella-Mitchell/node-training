const fs = require("fs");

function readFile(filename, encoding) {
  //TODO Create a promise version of the async readFile function
  return new Promise((resolve, reject) =>
    fs.readFile(filename, encoding, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  );
}

readFile("./support/demofile.txt", "utf-8").then((data) => console.log(data));
