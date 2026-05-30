import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import { UnauthorizedError } from "../utils/errors/app.error";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (
    req: any,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Access denied. Please login.");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        throw new UnauthorizedError("User not found.");
      }

      req.user = user;

      next();
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired access token.");
    }
  },
);
