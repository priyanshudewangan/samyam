import express from "express";
import {
  createEnquiry,
  deleteEnquiry,
  getAllEnquiries,
  getSingleEnquiry,
  updateEnquiry,
} from "./enquiry.controller";
import { protect } from "../../middlewares/auth.middlewate";

const enquiryRouter = express.Router();

/* =========================
   CREATE ENQUIRY
========================= */

enquiryRouter.post("/", createEnquiry);

/* =========================
   GET ALL ENQUIRIES
========================= */

enquiryRouter.get("/", protect, getAllEnquiries);

/* =========================
   GET SINGLE ENQUIRY
========================= */

enquiryRouter.get("/:id", protect, getSingleEnquiry);

/* =========================
   UPDATE ENQUIRY
========================= */

enquiryRouter.put("/:id", protect, updateEnquiry);

/* =========================
   DELETE ENQUIRY
========================= */

enquiryRouter.delete("/:id", protect, deleteEnquiry);

export default enquiryRouter;
