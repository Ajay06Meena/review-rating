import ReviewModel from "../model/review.model.js";
import { logger } from "../utils/logger.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const AddReview = async (req, res) => {
  try {
    const newReview = new ReviewModel(req.body);
    const review = await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review Added Successfully",
      data: review,
    });
  } catch (error) {
    logger.error(error, { service: "review.controller.js" });
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllReviewsByCompanyID = async (req, res) => {
  try {
    const pipeline = [
      // {
      //   // $match: {
      //   //   _id: ObjectId(req.params.id)
      //   // }
      //   $match: { company_id: new ObjectId(req.params.id)  }
      // },
      {
        $lookup: {
          from: 'companies',
          localField: 'company_id',
          foreignField: '_id',
          as: 'company_info'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'user_info'
        }
      },
      {
        $unwind: '$company_info'
      },
      {
        $unwind: '$user_info'
      },
      {
        $group: {
          _id: '$company_info._id',
          company_info: { $first: '$company_info' },
          reviews: {
            $push: {
              _id: '$_id',
              createdBy: '$createdBy',
              rating: '$rating',
              review: '$review',
              isActive: '$isActive',
              createdAt: '$createdAt',
              updatedAt: '$updatedAt',
              user_info: '$user_info'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          company_info: 1,
          reviews: 1
        }
      }
    ];

      const review = await ReviewModel.aggregate(pipeline)

    res.status(200).json({
      success: true,
      message: "Fetch All Reviews",
      data: review,
    });
  } catch (error) {
    logger.error(error, { service: "review.controller.js" });
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Fetch review's by data",
      data: review,
    });
  } catch (error) {
    logger.error(error, { service: "review.controller.js" });
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};