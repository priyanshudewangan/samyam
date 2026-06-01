// @ts-nocheck
import Teertha from "../../models/teerthas";
import { ConflictError, NotFoundError } from "../../utils/errors/app.error";

/* =========================
   CREATE TEERTHA
========================= */
interface CreateTeerthaPayload {
  slug: string;
  name: string;
  tagline?: string;
  region: string;
  duration: string;
  date?: string;
  desc: string;
  img: string;
  triplePrice?: string;
  doublePrice?: string;
  slogan?: string;
  staysHeading?: string;
  staysDesc?: string;
  itinerary?: {
    day: number;
    points: string[];
  }[];
  darshans?: {
    title: string;
    items: string[];
  }[];
  inclusions?: string[];
  highlights?: string[];
  significance?: string;
  isPublished?: boolean;
}

export const createTeerthaService = async (payload: CreateTeerthaPayload) => {
  const existingTeertha = await Teertha.findOne({
    slug: payload.slug,
  });

  if (existingTeertha) {
    throw new ConflictError("Teertha with this slug already exists");
  }

  const teertha = await Teertha.create({
    slug: payload.slug,
    name: payload.name,
    tagline: payload.tagline,
    region: payload.region,
    duration: payload.duration,
    date: payload.date,
    desc: payload.desc,
    img: payload.img,
    triplePrice: payload.triplePrice,
    doublePrice: payload.doublePrice,
    slogan: payload.slogan,
    staysHeading: payload.staysHeading,
    staysDesc: payload.staysDesc,
    itinerary: payload.itinerary ?? [],
    darshans: payload.darshans ?? [],
    inclusions: payload.inclusions ?? [],
    highlights: payload.highlights ?? [],
    significance: payload.significance,
    isPublished: payload.isPublished ?? true,
  });

  return teertha;
};

/* =========================
   GET ALL TEERTHAS
========================= */

export const getAllTeerthasService = async () => {
  const teerthas = await Teertha.find().sort({
    createdAt: -1,
  });

  return teerthas;
};

/* =========================
   GET SINGLE TEERTHA
========================= */

export const getSingleTeerthaService = async (slug: string) => {
  const teertha = await Teertha.findOne({
    slug,
  });

  if (!teertha) {
    throw new NotFoundError("Teertha not found");
  }

  return teertha;
};

/* =========================
   UPDATE TEERTHA
========================= */

interface UpdateTeerthaPayload {
  slug?: string;
  name?: string;
  tagline?: string;
  region?: string;
  duration?: string;
  date?: string;
  desc?: string;
  img?: string;
  triplePrice?: string;
  doublePrice?: string;
  slogan?: string;
  staysHeading?: string;
  staysDesc?: string;
  itinerary?: {
    day: number;
    points: string[];
  }[];
  darshans?: {
    title: string;
    items: string[];
  }[];
  inclusions?: string[];
  highlights?: string[];
  significance?: string;
  isPublished?: boolean;
}

export const updateTeerthaService = async (teerthaId: string, payload: UpdateTeerthaPayload) => {
  const teertha = await Teertha.findById(teerthaId);

  if (!teertha) {
    throw new NotFoundError("Teertha not found");
  }

  if (payload.slug && payload.slug !== teertha.slug) {
    const existingSlug = await Teertha.findOne({
      slug: payload.slug,
    });

    if (existingSlug) {
      throw new ConflictError("Slug already exists");
    }
  }

  const updatedTeertha = await Teertha.findByIdAndUpdate(teerthaId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedTeertha;
};

/* =========================
   DELETE TEERTHA
========================= */

export const deleteTeerthaService = async (teerthaId: string) => {
  const teertha = await Teertha.findById(teerthaId);

  if (!teertha) {
    throw new NotFoundError("Teertha not found");
  }

  await Teertha.findByIdAndDelete(teerthaId);

  return true;
};
