import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getDashboardStatsService, migrateInitialDataService } from "./dashboard.service";

/* ======================================================
   GET DASHBOARD STATS
====================================================== */
export const getDashboardStats = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const stats = await getDashboardStatsService();
    res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: stats,
    });
  },
);

/* ======================================================
   MIGRATE INITIAL DATA
====================================================== */
export const migrateInitialData = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (process.env.NODE_ENV === "production") {
      res.status(403).json({
        success: false,
        message: "Migration is not allowed in production mode",
      });
      return;
    }
    const result = await migrateInitialDataService();
    res.status(200).json({
      success: true,
      message: "Initial data seeded successfully",
      data: result,
    });
  },
);
