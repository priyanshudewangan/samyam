import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";

export const appErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error("App Error caught:", err);

  if (err && typeof err.statusCode === "number") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  next(err);
};

export const genericErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("Generic Error caught:", err);

  const isProduction = process.env.NODE_ENV === "production";

  res.status(500).json({
    success: false,
    message: isProduction ? "Internal Server Error" : err.message || "Internal Server Error",
  });
};
