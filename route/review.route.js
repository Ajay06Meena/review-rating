import express from "express";
import { authorization } from "../utils/authorization.js";
import { AddReview, getAllReviewsByCompanyID, getReviewById } from "../controller/review.controller.js";
import { userActive } from "../utils/userActive.js";
import { companyActive } from "../utils/companyActive.js";
const review = express.Router();

review.route('/company/:id')
  .get(authorization, getAllReviewsByCompanyID);

  review.route('/')
  .post(authorization,userActive,companyActive,AddReview)

  review.route('/:id')
  .get(getReviewById)
  export default review;
