const fs = require("fs");

function readFile(filename, encoding) {
  //TODO Create a promise version of the async readFile function
  fs.readFile(filename, encoding, (err, data) => {
    if (err) {
      console.log(err);
    }
    return data;
  });
}

readFile("./support/demofile.txt", "utf-8").then((data) => console.log(data));
