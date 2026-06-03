// @ts-nocheck
import Gallery from "../../models/gallery";
import { NotFoundError } from "../../utils/errors/app.error";

/* =========================
   CREATE GALLERY ITEM
========================= */
interface CreateGalleryItemPayload {
  title: string;
  img: string;
  category:
    | "places-visited"
    | "activities-or-ritual"
    | "landscapes-and-streets"
    | "people-and-emotions";
}

export const createGalleryItemService = async (payload: CreateGalleryItemPayload) => {
  const galleryItem = await Gallery.create({
    title: payload.title,
    img: payload.img,
    category: payload.category,
  });

  return galleryItem;
};

/* =========================
   GET ALL GALLERY ITEMS
========================= */
export const getAllGalleryItemsService = async () => {
  const galleryItems = await Gallery.find().sort({
    createdAt: -1,
  });

  return galleryItems;
};

/* =========================
   GET SINGLE GALLERY ITEM
========================= */
export const getSingleGalleryItemService = async (id: string) => {
  const galleryItem = await Gallery.findById(id);

  if (!galleryItem) {
    throw new NotFoundError("Gallery item not found");
  }

  return galleryItem;
};

/* =========================
   UPDATE GALLERY ITEM
========================= */
interface UpdateGalleryItemPayload {
  title?: string;
  img?: string;
  category?:
    | "places-visited"
    | "activities-or-ritual"
    | "landscapes-and-streets"
    | "people-and-emotions";
}

export const updateGalleryItemService = async (
  galleryItemId: string,
  payload: UpdateGalleryItemPayload,
) => {
  const galleryItem = await Gallery.findById(galleryItemId);

  if (!galleryItem) {
    throw new NotFoundError("Gallery item not found");
  }

  const updatedGalleryItem = await Gallery.findByIdAndUpdate(
    galleryItemId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedGalleryItem;
};

/* =========================
   DELETE GALLERY ITEM
========================= */
export const deleteGalleryItemService = async (galleryItemId: string) => {
  const galleryItem = await Gallery.findById(galleryItemId);

  if (!galleryItem) {
    throw new NotFoundError("Gallery item not found");
  }

  await Gallery.findByIdAndDelete(galleryItemId);

  return true;
};
