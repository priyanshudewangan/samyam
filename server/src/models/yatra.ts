import mongoose from "mongoose";

const yatraRetreatSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
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
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const YatraRetreat =
  mongoose.models.YatraRetreat ||
  mongoose.model("YatraRetreat", yatraRetreatSchema);

export default YatraRetreat;
