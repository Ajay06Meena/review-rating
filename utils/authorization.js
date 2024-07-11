import jwt from "jsonwebtoken";
import { responseMessages, StatusCodes } from "./constant.js";

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
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: responseMessages.UNAUTHORIZED_USER,
      });
    }
  } catch (error) {
    logger.error(error, { service: "Authorization" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};
