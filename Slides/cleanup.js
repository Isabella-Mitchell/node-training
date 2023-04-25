const { exec } = require("child_process");

exec(`rm -rf **/node_modules`, (err) => {
  if (err) {
    console.log(`There's a problem! ${err}`);
  }

  console.log("All done.");
});
