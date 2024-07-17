import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
      unique: true
    },

    location: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    founded_on: {
      type: Date,
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);


companySchema.index({ company_name: 1 }, { unique: true });
const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
