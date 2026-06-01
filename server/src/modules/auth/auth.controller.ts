import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  forgotPasswordService,
  getCurrentUserService,
  loginUserService,
  refreshAccessTokenService,
  registerUserService,
  resetPasswordService,
} from "../auth/auth.service";

/* =========================
   REGISTER CONTROLLER
========================= */
export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await registerUserService(email, password);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      email: user.email,
      accessToken,
      refreshToken,
    },
  });
});

/* =========================
   LOGIN CONTROLLER
========================= */
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUserService(email, password);
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      id: user._id,
      email: user.email,
      accessToken,
      refreshToken,
    },
  });
});

/* =========================
   REFRESH ACCESS TOKEN
========================= */
export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = await refreshAccessTokenService(refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });
  },
);

/* =========================
   LOGOUT CONTROLLER
========================= */
export const logoutUser = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

/* =========================
   CURRENT USER CONTROLLER
========================= */
export const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;
  const user = await getCurrentUserService(userId);
  res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    data: user,
  });
});

/* =========================
   FORGOT PASSWORD CONTROLLER
========================= */
export const forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const result = await forgotPasswordService(email);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

/* ========================= 
RESET PASSWORD CONTROLLER 
========================= */
export const resetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;
  const { password } = req.body;
  const result = await resetPasswordService(token, password);
  res.status(200).json({
    success: true,
    message: result.message,
    data: {
      id: result.user._id,
      email: result.user.email,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});
