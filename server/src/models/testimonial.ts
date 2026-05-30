import mongoose from "mongoose";

const testimonialVideoSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "Kashi Knowledge Portal",
        "Kashi Knowledge Portal • Quick Bits",
        "Testimonials (Coming Soon)",
      ],
    },

    youtubeLink: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const TestimonialVideo =
  mongoose.models.TestimonialVideo ||
  mongoose.model("TestimonialVideo", testimonialVideoSchema);

export default TestimonialVideo;
