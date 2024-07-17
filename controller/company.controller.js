import CompanyModel from "../model/company.model.js";
import { responseMessages, StatusCodes } from "../utils/constant.js";

export const companyRegistration = async(req, res) => {
    try {       
        const {company_name} = await CompanyModel(req.body)
        const existingCompany = await CompanyModel.findOne({ company_name });
        if (existingCompany) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: responseMessages.COMPANY_ALREADY_EXISTS
            });
        }
        const newCompany = new CompanyModel(req.body);
        const company = await newCompany.save();

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: responseMessages.COMPANY_CREATED,
            data:company
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: responseMessages.TOKEN_REQUIRED
        })
    }
}


export const getAllCompanies = async (req, res) => {
  const { name } = req.query;
  try {
      let companies;
      if (name) {
          companies = await CompanyModel.aggregate([
              {
                  $match: {
                      company_name: { $regex: name, $options: "i" }
                  }
              },
              {
                  $lookup: {
                      from: 'users', // The collection name in MongoDB for users
                      localField: 'createdBy',
                      foreignField: '_id',
                      as: 'user_info'
                  }
              }
          ]);
      } else {
          companies = await CompanyModel.aggregate([
              {
                  $lookup: {
                      from: 'users', // The collection name in MongoDB for users
                      localField: 'createdBy',
                      foreignField: '_id',
                      as: 'user_info'
                  }
              }
          ]);
      }

      res.status(StatusCodes.OK).json({
          success: true,
          message: "Fetched All Companies",
          data: companies
      });
  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal Server Error"
      });
  }
};

export const deleteCompanyById = async(req, res) => {
    try {
        const company = await CompanyModel.findByIdAndDelete(req.params.id);

        res.status(StatusCodes.OK).json({
            success: true,
            message: responseMessages.COMPANY_DELETED,
            data: company
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: responseMessages.INTERNAL_SERVER_ERROR,
        })
    }
} 