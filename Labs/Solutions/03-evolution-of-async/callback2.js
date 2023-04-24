const fs = require("fs");

// Instead of passing it up the stack throw it instead and try to catch it later on.

function readFileThenDo(next) {
  fs.readFile("./blah.nofile", (err, data) => {
    if (err) throw err;
    next(data);
  });
}

try {
  // Hint use try..catch
  readFileThenDo((data) => {
    console.log(data);
  });
} catch (error) {
  console.log(error);
}
