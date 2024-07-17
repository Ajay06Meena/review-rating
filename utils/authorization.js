import jwt from "jsonwebtoken";
import { responseMessages, StatusCodes } from "./constant.js";
import { logger } from "./logger.js";

export const authorization = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token.replace("Bearer ", "");
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: responseMessages.TOKEN_REQUIRED,
      });
    }
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (tokenVerify) {
      req.body.email = tokenVerify.email
      req.body.createdBy = tokenVerify._id
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: responseMessages.UNAUTHORIZED_USER,
      });
    }
  } catch (error) {
    // logger.error(error, { service: "Authorization" });
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: responseMessages.TOKEN_REQUIRED,
    });
  }
};
