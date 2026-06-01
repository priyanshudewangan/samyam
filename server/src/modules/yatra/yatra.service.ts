// @ts-nocheck
import YatraRetreat from "../../models/yatra";
import { ConflictError, NotFoundError } from "../../utils/errors/app.error";

/* =========================
   CREATE YATRA RETREAT
========================= */

interface CreateYatraRetreatPayload {
  slug: string;
  name: string;
  date: string;
  duration: string;
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
  isPublished?: boolean;
}

export const createYatraRetreatService = async (payload: CreateYatraRetreatPayload) => {
  const existingYatraRetreat = await YatraRetreat.findOne({
    slug: payload.slug,
  });

  if (existingYatraRetreat) {
    throw new ConflictError("Yatra retreat with this slug already exists");
  }

  const yatraRetreat = await YatraRetreat.create({
    slug: payload.slug,
    name: payload.name,
    date: payload.date,
    duration: payload.duration,
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
    isPublished: payload.isPublished ?? true,
  });

  return yatraRetreat;
};

/* =========================
   GET ALL YATRA RETREATS
========================= */

export const getAllYatraRetreatsService = async () => {
  const yatraRetreats = await YatraRetreat.find().sort({
    createdAt: -1,
  });

  return yatraRetreats;
};

/* =========================
   GET SINGLE YATRA RETREAT
========================= */

export const getSingleYatraRetreatService = async (slug: string) => {
  const yatraRetreat = await YatraRetreat.findOne({
    slug,
  });

  if (!yatraRetreat) {
    throw new NotFoundError("Yatra retreat not found");
  }

  return yatraRetreat;
};

/* =========================
   UPDATE YATRA RETREAT
========================= */

interface UpdateYatraRetreatPayload {
  slug?: string;
  name?: string;
  date?: string;
  duration?: string;
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
  isPublished?: boolean;
}

export const updateYatraRetreatService = async (
  yatraRetreatId: string,
  payload: UpdateYatraRetreatPayload,
) => {
  const yatraRetreat = await YatraRetreat.findById(yatraRetreatId);

  if (!yatraRetreat) {
    throw new NotFoundError("Yatra retreat not found");
  }

  if (payload.slug && payload.slug !== yatraRetreat.slug) {
    const existingSlug = await YatraRetreat.findOne({
      slug: payload.slug,
    });

    if (existingSlug) {
      throw new ConflictError("Slug already exists");
    }
  }

  const updatedYatraRetreat = await YatraRetreat.findByIdAndUpdate(yatraRetreatId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedYatraRetreat;
};

/* =========================
   DELETE YATRA RETREAT
========================= */

export const deleteYatraRetreatService = async (yatraRetreatId: string) => {
  const yatraRetreat = await YatraRetreat.findById(yatraRetreatId);

  if (!yatraRetreat) {
    throw new NotFoundError("Yatra retreat not found");
  }

  await YatraRetreat.findByIdAndDelete(yatraRetreatId);

  return true;
};
