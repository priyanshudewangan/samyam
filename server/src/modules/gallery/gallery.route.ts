import express from "express";
import {
  createGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
  getSingleGalleryItem,
  updateGalleryItem,
} from "./gallery.controller";
import { protect } from "../../middlewares/auth.middleware";

const galleryRouter = express.Router();

/* =========================
   CREATE GALLERY ITEM
========================= */
galleryRouter.post("/", protect, createGalleryItem);

/* =========================
   GET ALL GALLERY ITEMS
========================= */
galleryRouter.get("/", getAllGalleryItems);

/* =========================
   GET SINGLE GALLERY ITEM
========================= */
galleryRouter.get("/:id", getSingleGalleryItem);

/* =========================
   UPDATE GALLERY ITEM
========================= */
galleryRouter.put("/:id", protect, updateGalleryItem);

/* =========================
   DELETE GALLERY ITEM
========================= */
galleryRouter.delete("/:id", protect, deleteGalleryItem);

export default galleryRouter;
