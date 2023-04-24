import pino from "pino";
import http from "http";

import { serveBookRoute } from "./bookRoutes.js";

const logger = pino();

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }
  if (req.url.startsWith("/api/book")) {
    logger.info(req.url);
    logger.info(req.method);
    serveBookRoute(req, res);
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
