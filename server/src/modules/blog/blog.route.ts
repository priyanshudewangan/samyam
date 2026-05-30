import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "./blog.controller";
import { protect } from "../../middlewares/auth.middlewate";

const blogRouter = express.Router();

/* =========================
   CREATE BLOG
 ========================= */
blogRouter.post("/", protect, createBlog);

/* =========================
   GET ALL BLOGS
 ========================= */
blogRouter.get("/", getAllBlogs);

/* =========================
   GET SINGLE BLOG
 ========================= */
blogRouter.get("/:id", getSingleBlog);

/* =========================
   UPDATE BLOG
 ========================= */
blogRouter.put("/:id", protect, updateBlog);

/* =========================
   DELETE BLOG
 ========================= */
blogRouter.delete("/:id", protect, deleteBlog);

export default blogRouter;
