import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createGalleryItemService,
  deleteGalleryItemService,
  getAllGalleryItemsService,
  getSingleGalleryItemService,
  updateGalleryItemService,
} from "../gallery/gallery.service";

/* =========================
   CREATE GALLERY ITEM
========================= */
export const createGalleryItem = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const galleryItem = await createGalleryItemService(req.body);

    res.status(201).json({
      success: true,
      message: "Gallery item created successfully",
      data: galleryItem,
    });
  },
);

/* =========================
   GET ALL GALLERY ITEMS
========================= */
export const getAllGalleryItems = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const galleryItems = await getAllGalleryItemsService();

    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems,
    });
  },
);

/* =========================
   GET SINGLE GALLERY ITEM
========================= */
export const getSingleGalleryItem = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    const galleryItem = await getSingleGalleryItemService(id);

    res.status(200).json({
      success: true,
      data: galleryItem,
    });
  },
);

/* =========================
   UPDATE GALLERY ITEM
========================= */
export const updateGalleryItem = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    const updatedGalleryItem = await updateGalleryItemService(id, req.body);

    res.status(200).json({
      success: true,
      message: "Gallery item updated successfully",
      data: updatedGalleryItem,
    });
  },
);

/* =========================
   DELETE GALLERY ITEM
========================= */
export const deleteGalleryItem = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    await deleteGalleryItemService(id);

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  },
);
