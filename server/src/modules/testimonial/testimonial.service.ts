// @ts-nocheck
import TestimonialVideo from "../../models/testimonial";
import { NotFoundError } from "../../utils/errors/app.error";

/* =========================
   CREATE TESTIMONIAL VIDEO
========================= */
interface CreateTestimonialVideoPayload {
  category:
    | "Kashi Knowledge Portal"
    | "Kashi Knowledge Portal • Quick Bits"
    | "Testimonials (Coming Soon)";

  youtubeLink: string;
}

export const createTestimonialVideoService = async (payload: CreateTestimonialVideoPayload) => {
  const testimonialVideo = await TestimonialVideo.create({
    category: payload.category,
    youtubeLink: payload.youtubeLink,
  });

  return testimonialVideo;
};

/* =========================
   GET ALL TESTIMONIAL VIDEOS
========================= */
export const getAllTestimonialVideosService = async () => {
  const testimonialVideos = await TestimonialVideo.find().sort({
    createdAt: -1,
  });

  return testimonialVideos;
};

/* =========================
   GET SINGLE TESTIMONIAL VIDEO
========================= */
export const getSingleTestimonialVideoService = async (id: string) => {
  const testimonialVideo = await TestimonialVideo.findById(id);

  if (!testimonialVideo) {
    throw new NotFoundError("Testimonial video not found");
  }

  return testimonialVideo;
};

/* =========================
   UPDATE TESTIMONIAL VIDEO
========================= */

interface UpdateTestimonialVideoPayload {
  category?:
    | "Kashi Knowledge Portal"
    | "Kashi Knowledge Portal • Quick Bits"
    | "Testimonials (Coming Soon)";

  youtubeLink?: string;
}

export const updateTestimonialVideoService = async (
  testimonialVideoId: string,
  payload: UpdateTestimonialVideoPayload,
) => {
  const testimonialVideo = await TestimonialVideo.findById(testimonialVideoId);

  if (!testimonialVideo) {
    throw new NotFoundError("Testimonial video not found");
  }

  const updatedTestimonialVideo = await TestimonialVideo.findByIdAndUpdate(
    testimonialVideoId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedTestimonialVideo;
};

/* =========================
   DELETE TESTIMONIAL VIDEO
========================= */

export const deleteTestimonialVideoService = async (testimonialVideoId: string) => {
  const testimonialVideo = await TestimonialVideo.findById(testimonialVideoId);

  if (!testimonialVideo) {
    throw new NotFoundError("Testimonial video not found");
  }

  await TestimonialVideo.findByIdAndDelete(testimonialVideoId);

  return true;
};
