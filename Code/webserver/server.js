const http = require("http");

let books = [
  { id: 1, author: "John Scalzi", title: "Old Man's War" },
  { id: 2, author: "Mary Robinette Kowal", title: "The Calculating Stars" },
];

let nextId = 3;

// Open a connection to the internet/network to be available
// Parse the web request - route (url, pathname, query parameters, protocol) ✅, method ✅, body ✅, headers ✅
const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }
  // C R U D
  if (req.url === "/api/books" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(books));
    return;
  }

  if (req.url === "/api/books" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    }); // addEventListener
    req.on("end", () => {
      const newBook = { ...JSON.parse(body), id: nextId++ };
      books.push(newBook);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newBook));
    });
    return;
  }
  if (req.url === "/goodbye") {
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Goodbye, world!!!!!!!</h1>");
    return;
  }

  res.statusCode = 404;
  res.end("<h1>We don't serve that round here!</h1>");
});

server.listen(3000, "127.0.0.1", () => {
  console.log(`I'm listening on port 3000.`);
});

// GET, POST, DELETE, PUT, PATCH >>>>> HEAD, OPTION,

// Build a web response - status code , body, headers
// 200
// 418
