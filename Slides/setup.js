const { readdir } = require("fs/promises");
const { exec } = require("child_process");

async function setup() {
  const dirs = (await readdir(__dirname, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((dir) => dir.name);
  dirs.forEach((dir) =>
    exec(`cd ${__dirname}/${dir} && npm install`, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`${dir} installed.`);
    })
  );
}

setup();
