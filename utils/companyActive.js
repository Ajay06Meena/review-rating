import CompanyModel from "../model/company.model.js";
import { StatusCodes } from "./constant.js";

export const companyActive = async(req, res, next) => {
  const { company_name, company_id } = req.body;
  let company;
  if(company_id){
    company = await CompanyModel.findById(company_id);
  }
  if(company_name){
     company = await CompanyModel.findOne({company_name});
  }

  if (company && company.isActive) {
    next();
  } else {
    res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: "Company is not active yet, Please connect to Admin",
    });
  }
};
