import express from "express";

import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
} from "../auth/auth.controller";
import { protect } from "../../middlewares/auth.middleware";

const authRoute = express.Router();

authRoute.post("/login", loginUser);
authRoute.post("/refresh-token", refreshAccessToken);
authRoute.post("/forgot-password", forgotPassword);
authRoute.post("/reset-password/:token", resetPassword);
authRoute.post("/logout", protect, logoutUser);
authRoute.get("/me", protect, getCurrentUser);

export default authRoute;
