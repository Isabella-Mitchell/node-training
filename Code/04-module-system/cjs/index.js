const logger = require("pino")();
const { add } = require("./exports");

console.log(add(1, 2));

console.log(__filename);
console.log(__dirname);
console.log(module);

// ESM - MJS
