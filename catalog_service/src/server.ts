import app from "./app";
import { logger } from "./utils";

const PORT = process.env.APP_PORT || 8000;

export const StartServer = async () => {
  app.listen(PORT, () => {
    logger.info(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("server is up");
});
