import UserModel from "../model/user.model.js";
import { StatusCodes } from "./constant.js";

export const userActive = async(req, res, next) => {
  const { email } = req.body;
  let user;
  if(req.params.id){
    user = await UserModel.findById(req.params.id);
  }
  if(req.body.email){
     user = await UserModel.findOne({email});
  }

  if (user && user.isActive) {
    next();
  } else {
    res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: "User is not active yet, Please connect to admin",
    });
  }
};
