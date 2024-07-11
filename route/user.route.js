import express from "express";
import { getAllUser, getUserById, updateUserById, deleteUserById, createUser, login, forgotPassword, ActivateUser, deActivateUser, resetPassword } from "../controller/user.controller.js";
import { authorization } from "../utils/authorization.js";
import { userActive } from "../utils/userActive.js";
const user = express.Router();

user.route('/')
  .get(getAllUser);

  user.route('/register')
  .post(createUser)

  user.route('/login')
  .post(userActive, login)

  user.route('/forget-password')
  .post(userActive, forgotPassword)

  user.route('/reset-password/:token')
  .post(resetPassword)

user.route('/:id')
  .get(userActive, getUserById)
  .put(userActive, updateUserById)
  .delete(userActive, deleteUserById);

user.route('/activate/:id').get(ActivateUser);  
user.route('/deActivate/:id').get(deActivateUser);  

export default user;
