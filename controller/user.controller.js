import UserModel from "../model/user.model.js";
import {
  comparePassword,
  encryptPassword,
  generateSalt,
  generateToken,
  sendEmail,
} from "../utils/auth.js";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";
import { StatusCodes, responseMessages } from "../utils/constant.js";
import { logger } from "../utils/logger.js";

export const createUser = async (req, res) => {
  try {
    const salt = generateSalt();
    let data = req.body;
    data.salt = salt;
    data.password = encryptPassword(data.password, salt);
    const newUser = new UserModel(data);
    const user = await newUser.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: responseMessages.USER_CREATED,
      data: user,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    if (error.code === 11000) {
      // Duplicate email
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: responseMessages.EMAIL_ALREADY_EXISTS });
    } else {
      logger.error(error, { service: "user-controller" });
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to create User", //change the message
        error,
      });
    }
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: responseMessages.USER_FETCH,
      data: user,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.USER_FETCH_FAILED,
      error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(StatusCodes.OK).json({
      success: true,
      message: responseMessages.USER_FETCH,
      data: user,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.USER_FETCH_FAILED, //change message
      error,
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      message: responseMessages.USER_UPDATED,
      data: user,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.USER_UPDATE_FAILED,
      error,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      message: responseMessages.USER_DELETED,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.USER_DELETION_FAILED,
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      const isPassword = comparePassword(password, user.password, user.salt);
      user = user.toObject();
      delete user.password;
      delete user.salt;
      const token = generateToken(user);
      if (isPassword) {
        res.status(StatusCodes.OK).json({
          success: true,
          message: responseMessages.SUCCESSFUL_LOGIN,
          token,
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: true,
          message: responseMessages.INVALID_CREDENTIALS,
        });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: responseMessages.USER_NOT_EXIST,
      });
    }
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    }).lean();

    if (!userData) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: responseMessages.USER_NOT_FOUND,
      });
    }

    let subject = "Forgot Password";
    const randomString = randomstring.generate();
    let text = `http//localhost:3002/resetPassword/${randomString}`;
    await UserModel.updateOne(
      { email: email },
      { $set: { forgotPasswordToken: randomString } }
    );

    // await sendEmail(email, subject, text);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "mail send",
      url: text,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const user = await UserModel.findOne({
    forgotPasswordToken: req.params.token,
  });

  if (user) {
    const password = encryptPassword(req.body.password, user.salt);
    try {
      await UserModel.findByIdAndUpdate(user._id, { password });

      res.status(StatusCodes.OK).json({
        success: true,
        message: responseMessages.PASSWORD_RESET_SUCCESS,
      });
    } catch (error) {
      logger.error(error, { service: "user-controller" });
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: true,
        message: responseMessages.INTERNAL_SERVER_ERROR,
      });
    }
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: responseMessages.TOKEN_EXPIRED,
    });
  }
};

export const ActivateUser = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, { isActive: true });
    res.status(StatusCodes.OK).json({
      success: true,
      message: responseMessages.USER_ACTIVATED,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deActivateUser = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(StatusCodes.OK).json({
      success: true,
      message: responseMessages.USER_DEACTIVATED,
    });
  } catch (error) {
    logger.error(error, { service: "user-controller" });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};
