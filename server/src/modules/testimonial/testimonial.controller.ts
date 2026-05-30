import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createTestimonialVideoService,
  deleteTestimonialVideoService,
  getAllTestimonialVideosService,
  getSingleTestimonialVideoService,
  updateTestimonialVideoService,
} from "../testimonial/testimonial.service";

/* =========================
   CREATE TESTIMONIAL VIDEO
========================= */

export const createTestimonialVideo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const testimonialVideo = await createTestimonialVideoService(req.body);

    res.status(201).json({
      success: true,
      message: "Testimonial video created successfully",

      data: testimonialVideo,
    });
  },
);

/* =========================
   GET ALL TESTIMONIAL VIDEOS
========================= */

export const getAllTestimonialVideos = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const testimonialVideos = await getAllTestimonialVideosService();

    res.status(200).json({
      success: true,

      count: testimonialVideos.length,

      data: testimonialVideos,
    });
  },
);

/* =========================
   GET SINGLE TESTIMONIAL VIDEO
========================= */

export const getSingleTestimonialVideo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const testimonialVideo = await getSingleTestimonialVideoService(id);

    res.status(200).json({
      success: true,

      data: testimonialVideo,
    });
  },
);

/* =========================
   UPDATE TESTIMONIAL VIDEO
========================= */

export const updateTestimonialVideo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const updatedTestimonialVideo = await updateTestimonialVideoService(
      id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Testimonial video updated successfully",

      data: updatedTestimonialVideo,
    });
  },
);

/* =========================
   DELETE TESTIMONIAL VIDEO
========================= */

export const deleteTestimonialVideo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await deleteTestimonialVideoService(id);

    res.status(200).json({
      success: true,
      message: "Testimonial video deleted successfully",
    });
  },
);
