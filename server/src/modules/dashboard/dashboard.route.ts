import express from "express";
import { getDashboardStats, migrateInitialData } from "./dashboard.controller";

const dashboardRoute = express.Router();

/* ======================================================
   DASHBOARD ROUTES
====================================================== */
dashboardRoute.get("/", getDashboardStats);
dashboardRoute.get("/stats", getDashboardStats);
dashboardRoute.post("/migrate", migrateInitialData);

export default dashboardRoute;
