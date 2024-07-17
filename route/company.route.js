import { companyRegistration, deleteCompanyById, getAllCompanies } from "../controller/company.controller.js";
import express from "express";
const company = express.Router();
import { authorization } from "../utils/authorization.js";
import { userActive } from "../utils/userActive.js";


company.route('/register')
.post(authorization,userActive,companyRegistration);

company.route('/')
  .get(authorization,getAllCompanies);

company.route('/:id')
.delete(authorization, deleteCompanyById)

export default company;

// companyActive
