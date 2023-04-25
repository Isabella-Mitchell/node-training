const fs = require("fs");

// Instead of passing it up the stack throw it instead and try to catch it later on.

function readFileThenDo(next) {
  fs.readFile("./blah.nofile", (err, data) => {
    if (err) next(err); // throw err
    next(data);
  });
}
// Hint use try..catch
readFileThenDo((data) => {
  console.log(data);
});
