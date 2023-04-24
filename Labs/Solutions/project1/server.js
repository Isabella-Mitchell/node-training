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
  console.log(request);
  // GET
  if (request.method === "GET") {
    // send the whole book object
    // JSON.stringify()
  }

  // POST
  if (request.method === "POST") {
    let body = [];
    request.on("data", (bodyData) => body.push(bodyData));
    request.on("end", () => {
      body = JSON.parse(Buffer.concat(body).toString());
      console.log(body);
    });
  }

  // DELETE

  // PATCH

  response.write("<h1>Goodbye</h1>");
  response.end();
});

app.listen(port);
console.log(`Server is running on port ${port}.`);
