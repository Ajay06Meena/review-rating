import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: false,
  },

  forgotPasswordToken: { 
    type: String,
    default: null,
   },
  isActive: { type: Boolean, default: false },
},
{timestamps: true}
);

userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
