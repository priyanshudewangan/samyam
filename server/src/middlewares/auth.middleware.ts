import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import { UnauthorizedError, ForbiddenError } from "../utils/errors/app.error";
import { serverConfig } from "../config";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    let token = "";

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError("Access denied. Please login.");
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, serverConfig.JWT_SECRET) as {
        id: string;
      };
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired access token.");
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new UnauthorizedError("User not found.");
    }

    // Check if user email is whitelisted in allowed admin emails
    const emailNormalized = user.email.trim().toLowerCase();
    if (!serverConfig.ALLOWED_ADMIN_EMAILS.includes(emailNormalized)) {
      throw new ForbiddenError("Access denied. You are not an authorized administrator.");
    }

    req.user = user;

    next();
  },
);
