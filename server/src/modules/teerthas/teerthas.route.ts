import express from "express";
import {
  createTeertha,
  deleteTeertha,
  getAllTeerthas,
  getSingleTeertha,
  updateTeertha,
} from "./teerthas.controller";
import { protect } from "../../middlewares/auth.middlewate";

const teerthaRouter = express.Router();

/* =========================
   CREATE TEERTHA
========================= */
teerthaRouter.post("/", protect, createTeertha);

/* =========================
   GET ALL TEERTHAS
========================= */
teerthaRouter.get("/", getAllTeerthas);

/* =========================
   GET SINGLE TEERTHA
========================= */
teerthaRouter.get("/:slug", getSingleTeertha);

/* =========================
   UPDATE TEERTHA
========================= */
teerthaRouter.put("/:id", protect, updateTeertha);

/* =========================
   DELETE TEERTHA
========================= */
teerthaRouter.delete("/:id", protect, deleteTeertha);

export default teerthaRouter;
