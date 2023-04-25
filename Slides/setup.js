const { readdir } = require("fs/promises");
const { exec } = require("child_process");

async function setup() {
  const dirs = (await readdir(__dirname, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((dir) => dir.name);
  dirs.forEach((dir) =>
    exec(
      `cd ${__dirname}/${dir} && npm i npm install`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
        console.log(`${dir} installed.`);
      }
    )
  );
}

generatePdfs();

async function generatePdfs() {
  const dirs = (await readdir(__dirname, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((dir) => dir.name);

  await Promise.all(
    dirs.map((dir) =>
      execShellCommand(`cd ${__dirname}/${dir} && npm run export`)
    )
  );
  console.log("All exported.");
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}
