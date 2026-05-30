import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createYatraRetreatService,
  deleteYatraRetreatService,
  getAllYatraRetreatsService,
  getSingleYatraRetreatService,
  updateYatraRetreatService,
} from "../yatra/yatra.service";

/* =========================
   CREATE YATRA RETREAT
========================= */

export const createYatraRetreat = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const yatraRetreat = await createYatraRetreatService(req.body);

    res.status(201).json({
      success: true,
      message: "Yatra retreat created successfully",

      data: yatraRetreat,
    });
  },
);

/* =========================
   GET ALL YATRA RETREATS
========================= */

export const getAllYatraRetreats = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const yatraRetreats = await getAllYatraRetreatsService();
    res.status(200).json({
      success: true,
      count: yatraRetreats.length,
      data: yatraRetreats,
    });
  },
);

/* =========================
   GET SINGLE YATRA RETREAT
========================= */

export const getSingleYatraRetreat = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const yatraRetreat = await getSingleYatraRetreatService(slug);
    res.status(200).json({
      success: true,
      data: yatraRetreat,
    });
  },
);

/* =========================
   UPDATE YATRA RETREAT
========================= */

export const updateYatraRetreat = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedYatraRetreat = await updateYatraRetreatService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Yatra retreat updated successfully",
      data: updatedYatraRetreat,
    });
  },
);

/* =========================
   DELETE YATRA RETREAT
========================= */

export const deleteYatraRetreat = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await deleteYatraRetreatService(id);
    res.status(200).json({
      success: true,
      message: "Yatra retreat deleted successfully",
    });
  },
);
