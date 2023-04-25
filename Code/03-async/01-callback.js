const fs = require("fs");
// CommonJS

// Callbacks!!
fs.readFile(__filename, (error, data) => {
  if (error) {
    console.log(error);
  }
  // console.log(data.toString());
});

// Parallel
// Do the same thing over and over again!!

const results = [];

fs.readFile("./data.json", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  results.push(data.toJSON());
  console.log(results);
});

fs.readFile(__filename, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  results.push(data.toJSON());
  console.log(results);
});

fs.readFile("other.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  results.push(data.toJSON());
  console.log(results);
});

// Series
// Operation 2 is dependent on the result from operation 1.

fs.readFile("./data.json", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const [{ otherfile }] = JSON.parse(data.toString());

  fs.readFile(otherfile, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // console.log(data.toString());
  });
});

// Callback hell!!
