const pino = require("pino");
const http = require("http");

const logger = pino();

const hostname = "127.0.0.1";
const port = 3000;

let books = [
  { id: 1, author: "John Scalzi", title: "Old Man's War" },
  { id: 2, author: "Fredrik Backman", title: "Anxious People" },
  { id: 3, author: "Mary Robinette Kowal", title: "The Calculating Stars" },
];

let nextId = 4;

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }
  if (req.url.startsWith("/api/books")) {
    logger.info(req.url);
    logger.info(req.method);
    if (req.url.endsWith("/api/books")) {
      // "/api/book"
      switch (req.method) {
        case "GET":
        case "get":
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(books));
          return;
        case "POST":
        case "post":
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            books.push({ ...JSON.parse(body), id: nextId++ });
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(books));
          });
          return;
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain");
          res.end("Sorry. We don't serve this verb yet.\n");
      }
    } else {
      // /api/book/id
      const urlArray = req.url.split("/");

      // Return early if we have too many parts
      if (urlArray.length !== 4) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Sorry. We don't serve this route yet.\n");
        return;
      }

      // get id
      const id = parseInt(urlArray[urlArray.length - 1]);
      let body = "";

      switch (req.method) {
        case "GET":
        case "get":
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          const book = books.filter(
            (item) => console.log(item.id, id) || item.id === id
          )[0];
          res.end(JSON.stringify(book));
          return;
        case "PATCH":
        case "patch":
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            if (!books.map((item) => item.id).includes(id)) {
              res.statusCode = 404;
              res.setHeader("Content-Type", "text/plain");
              res.end("Sorry. We don't have a book with that id.\n");
              return;
            }
            const newBooks = books.filter((item) => item.id !== id);
            newBooks.push({ id, ...JSON.parse(body) });
            books = newBooks;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(books));
          });
          return;
        case "DELETE":
        case "delete":
          if (!books.map((item) => item.id).includes(id)) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("Sorry. We don't have a book with that id.\n");
            return;
          }
          const newBooks = books.filter((item) => item.id !== id);
          books = newBooks;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(books));
          return;
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain");
          res.end("Sorry. We don't serve this verb yet.\n");
      }
    }
  } else {
    logger.warn("in here");
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Sorry. We don't serve this route yet.\n");
  }
});

server.listen(port, hostname, () => {
  logger.info(`Server running at http://${hostname}:${port}/`);
});
