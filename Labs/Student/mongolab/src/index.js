import app from "./server.js";
import config from "./config/config.js";

app.listen(config.app.PORT, () => {
  config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
});
