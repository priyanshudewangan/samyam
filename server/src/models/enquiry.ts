import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    preferredYatra: {
      type: String,
      default: "General Enquiry",
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    travelers: {
      type: String,
      trim: true,
    },

    journeyType: {
      type: String,
      trim: true,
    },

    budget: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Resolved"],
      default: "New",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
