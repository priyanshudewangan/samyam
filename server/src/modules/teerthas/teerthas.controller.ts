import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createTeerthaService,
  deleteTeerthaService,
  getAllTeerthasService,
  getSingleTeerthaService,
  updateTeerthaService,
} from "../teerthas/teerthas.service";

/* =========================
   CREATE TEERTHA
========================= */

export const createTeertha = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const teertha = await createTeerthaService(req.body);

  res.status(201).json({
    success: true,
    message: "Teertha created successfully",

    data: teertha,
  });
});

/* =========================
   GET ALL TEERTHAS
========================= */

export const getAllTeerthas = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const teerthas = await getAllTeerthasService();

  res.status(200).json({
    success: true,

    count: teerthas.length,

    data: teerthas,
  });
});

/* =========================
   GET SINGLE TEERTHA
========================= */

export const getSingleTeertha = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;

  const teertha = await getSingleTeerthaService(slug);

  res.status(200).json({
    success: true,

    data: teertha,
  });
});

/* =========================
   UPDATE TEERTHA
========================= */

export const updateTeertha = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const updatedTeertha = await updateTeerthaService(id, req.body);

  res.status(200).json({
    success: true,
    message: "Teertha updated successfully",

    data: updatedTeertha,
  });
});

/* =========================
   DELETE TEERTHA
========================= */

export const deleteTeertha = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  await deleteTeerthaService(id);

  res.status(200).json({
    success: true,
    message: "Teertha deleted successfully",
  });
});
