import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    quote: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      default: "Nileema Shenoy",
      trim: true,
    },
    authorTitle: {
      type: String,
      default: "Founder & CEO",
      trim: true,
    },
    authorImage: {
      type: String,
      default: "/images/founder.jpg",
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
