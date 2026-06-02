import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { serverConfig } from "./config";
import logger from "./config/logger.config";
import { connectDB } from "./config/db.config";
import v1Router from "./routers/v1/index.router";
import { appErrorHandler, genericErrorHandler } from "./middlewares/error.middleware";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";

/* =========================
   APP
========================= */

const app = express();

/* =========================
   SECURITY MIDDLEWARES
========================= */

app.use(helmet());

/* =========================
   DATABASE CONNECTION
========================= */

connectDB();

/* =========================
   MIDDLEWARES
========================= */

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      const isCloudflare =
        origin.endsWith(".samyam.pages.dev") || origin.endsWith(".samyam.workers.dev");
      if (isLocal || isCloudflare || origin === "https://samyam.co") {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachCorrelationIdMiddleware);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    environment: serverConfig.NODE_ENV,
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/v1", v1Router);

/* =========================
   ERROR HANDLERS
========================= */

app.use(appErrorHandler);

app.use(genericErrorHandler);

/* =========================
   START SERVER
========================= */

app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Environment: ${serverConfig.NODE_ENV}`);
  logger.info("Press Ctrl+C to stop the server");
});

/* =========================
   EXPORT APP
========================= */

export default app;
