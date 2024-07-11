import mongoose from "mongoose";
import { logger } from "./logger.js";

export const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((res) => {
      const {
        port: DB_PORT,
        host: DB_HOST,
        name: DB_NAME,
      } = res.connections[0];
      logger.info(
        `${DB_NAME} Database connected on PORT ${DB_PORT} on ${DB_HOST}`,
        { service: "Database" }
      );
    })
    .catch((err) => {
      logger.info(err, { service: "Database" });
    });
};
