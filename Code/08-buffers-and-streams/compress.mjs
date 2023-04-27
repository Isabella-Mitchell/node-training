import { createReadStream, createWriteStream } from "node:fs";
import { createGzip, gzip } from "node:zlib";
import { promisify } from "node:util";

const gzipPromise = promisify(gzip);

const filename = process.argv[2];

async function main() {
  createReadStream(filename)
    .pipe(createGzip())
    .pipe(createWriteStream(`${filename}.gz`))
    .on("finish", () => console.log("All done!"));
}

async function oldMain() {
  const data = await readFile(filename);
  const gzippedData = await gzipPromise(data);
  await writeFile(`${filename}.gz`, gzippedData);
  console.log("File successfully compressed");
}
main();
