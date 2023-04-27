import app from "./app.js";
import connectToDB from "./db/db.js";

await connectToDB;
app.listen(7337, () => {
  console.log("I'm listening on port 7337.");
});
