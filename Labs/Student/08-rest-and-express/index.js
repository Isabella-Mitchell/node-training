const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toLowerCase();

  if (method === "get") {
    if (path === "/") {
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello");
    } else if (path === "/users") {
      fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.setHeader("Content-Type", "application/json");
          res.end(data);
        }
      });
    } else if (path.startsWith("/users/")) {
      const id = parseInt(path.slice(7));

      if (!isNaN(id)) {
        fs.readFile("users.json", "utf8", (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
          } else {
            const users = JSON.parse(data);
            const user = users.find((u) => u.id === id);

            if (user) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(user));
            } else {
              res.statusCode = 404;
              res.end("User not found");
            }
          }
        });
      } else {
        res.statusCode = 400;
        res.end("Invalid ID");
      }
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  } else {
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
