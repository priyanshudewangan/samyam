import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createEnquiryService,
  deleteEnquiryService,
  getAllEnquiriesService,
  getSingleEnquiryService,
  updateEnquiryService,
} from "../enquiry/enquiry.service";

/* =========================
   CREATE ENQUIRY
========================= */

export const createEnquiry = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const enquiry = await createEnquiryService(req.body);

    res.status(201).json({
      success: true,
      message: "Enquiry created successfully",
      data: enquiry,
    });
  },
);

/* =========================
   GET ALL ENQUIRIES
========================= */

export const getAllEnquiries = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const enquiries = await getAllEnquiriesService();

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  },
);

/* =========================
   GET SINGLE ENQUIRY
========================= */

export const getSingleEnquiry = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const enquiry = await getSingleEnquiryService(id);

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  },
);

/* =========================
   UPDATE ENQUIRY STATUS
========================= */

export const updateEnquiry = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const updatedEnquiry = await updateEnquiryService(id, req.body);

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: updatedEnquiry,
    });
  },
);

/* =========================
   DELETE ENQUIRY
========================= */

export const deleteEnquiry = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await deleteEnquiryService(id);
    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  },
);
