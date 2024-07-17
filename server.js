import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoute from "./route/user.route.js";

// import companyRoute from "./route/company.route.js";
// import swaggerUi from 'swagger-ui-express';
// import specs from './swaggerConfig.js';

import { connectDatabase } from "./utils/database.js";
import { logger } from "./utils/logger.js";
import { StatusCodes } from "./utils/constant.js";
import companyRoute from "./route/company.route.js";
import reviewRoute from "./route/review.route.js";

dotenv.config();

const app = express();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //Ajju it is for form data
app.use(cors());

app.use("/user", userRoute);
app.use("/company", companyRoute)
app.use("/review", reviewRoute);

// app.use("/company", companyRoute);
app.get("/health", (req, res) => {
  res.json("API is working");
});

connectDatabase();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Something went wrong!" });
});

app.listen(process.env.PORT, () => {
  logger.info(`listening on port ${process.env.PORT}`, { service: "Server" });
});
