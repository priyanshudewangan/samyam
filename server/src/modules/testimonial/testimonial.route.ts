import express from "express";
import {
  createTestimonialVideo,
  deleteTestimonialVideo,
  getAllTestimonialVideos,
  getSingleTestimonialVideo,
  updateTestimonialVideo,
} from "./testimonial.controller";
import { protect } from "../../middlewares/auth.middleware";

const testimonialRouter = express.Router();

/* =========================
   CREATE TESTIMONIAL VIDEO
========================= */
testimonialRouter.post("/", protect, createTestimonialVideo);

/* =========================
   GET ALL TESTIMONIAL VIDEOS
========================= */
testimonialRouter.get("/", getAllTestimonialVideos);

/* =========================
   GET SINGLE TESTIMONIAL VIDEO
========================= */
testimonialRouter.get("/:id", getSingleTestimonialVideo);

/* =========================
   UPDATE TESTIMONIAL VIDEO
========================= */
testimonialRouter.put("/:id", protect, updateTestimonialVideo);

/* =========================
   DELETE TESTIMONIAL VIDEO
========================= */
testimonialRouter.delete("/:id", protect, deleteTestimonialVideo);

export default testimonialRouter;
