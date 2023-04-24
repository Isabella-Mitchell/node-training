const http = require("http");
const querystring = require("querystring");
const port = 3000;

let bookStore = [
  {
    id: 1,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    location: "JavaScript",
  },
];

let id = 1;

const app = http.createServer();

// TODO:
// - Add CRUD functionality to our in memory bookStore over HTTP
// - Decide if route or verb is the right way to handle it
// - Could you refactor the in memory store to be a closure?
// -

app.on("request", (request, response) => {
  // GET
  if (request.method === "GET") {
    // send the whole book object
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(bookStore));
    response.end();
  }

  // POST
  if (request.method === "POST") {
    let body = [];
    request.on("data", (bodyData) => body.push(bodyData));
    request.on("end", () => {
      body = JSON.parse(Buffer.concat(body).toString());
      body.id = ++id;
      bookStore.push(body);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ success: true, message: "Added book." }));
      response.end();
    });
  }

  // DELETE
  if (request.method === "DELETE") {
    const id = request.url.split("/")[1];
    bookStore = bookStore.filter((book) => book.id !== Number.parseInt(id));

    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(bookStore));
    response.end();
  }

  // PATCH
  if (request.method === "PATCH") {
    const id = request.url.split("/")[1];

    const tempStore = bookStore.filter(
      (book) => book.id !== Number.parseInt(id)
    );

    const bookToUpdate = bookStore.filter(
      (book) => book.id === Number.parseInt(id)
    )[0];

    let body = [];

    request.on("data", (bodyData) => body.push(bodyData));

    request.on("end", () => {
      body = Buffer.concat(body).toString();
      const bookUpdates = JSON.parse(body);
      const updatedbook = { ...bookToUpdate, ...bookUpdates };
      bookStore = [...tempStore, updatedbook];
      response.write("Updated book.");
      response.end();
    });
  }
});

app.listen(port);
console.log(`Server is running on port ${port}.`);
