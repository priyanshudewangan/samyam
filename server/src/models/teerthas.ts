import mongoose from "mongoose";

const teerthaSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      required: [true, "Region is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    img: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    triplePrice: {
      type: String,
      trim: true,
    },
    doublePrice: {
      type: String,
      trim: true,
    },
    slogan: {
      type: String,
      trim: true,
    },
    staysHeading: {
      type: String,
      trim: true,
    },
    staysDesc: {
      type: String,
      trim: true,
    },
    itinerary: [
      {
        day: { type: Number, required: true },
        points: { type: [String], default: [] },
      },
    ],
    darshans: [
      {
        title: { type: String, required: true },
        items: { type: [String], default: [] },
      },
    ],
    inclusions: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    significance: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

teerthaSchema.index({ slug: 1 });
teerthaSchema.index({ name: "text", desc: "text" });

const Teertha = mongoose.models.Teertha || mongoose.model("Teertha", teerthaSchema);

export default Teertha;
