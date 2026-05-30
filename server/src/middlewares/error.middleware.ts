import { NextFunction, Request, Response } from "express";

export const appErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.log("App Error caught:", err);

    if (err && typeof err.statusCode === "number") {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
        return;
    }
    
    next(err);
}

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Generic Error caught:", err);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}