import express from "express";
import {
  createYatraRetreat,
  deleteYatraRetreat,
  getAllYatraRetreats,
  getSingleYatraRetreat,
  updateYatraRetreat,
} from "../yatra/yatra.controller";
import { protect } from "../../middlewares/auth.middlewate";

const yatraRouter = express.Router();

/* =========================
   CREATE YATRA RETREAT
========================= */
yatraRouter.post("/", protect, createYatraRetreat);

/* =========================
   GET ALL YATRA RETREATS
========================= */
yatraRouter.get("/", getAllYatraRetreats);

/* =========================
   GET SINGLE YATRA RETREAT
========================= */
yatraRouter.get("/:slug", getSingleYatraRetreat);

/* =========================
   UPDATE YATRA RETREAT
========================= */
yatraRouter.put("/:id", protect, updateYatraRetreat);

/* =========================
   DELETE YATRA RETREAT
========================= */
yatraRouter.delete("/:id", protect, deleteYatraRetreat);

export default yatraRouter;
