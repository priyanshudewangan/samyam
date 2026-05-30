import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/* =========================
   SERVER CONFIG TYPE
========================= */

type ServerConfig = {
  PORT: number;
  NODE_ENV: string;

  MONGODB_URI: string;

  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;

  JWT_EXPIRES_IN: jwt.SignOptions["expiresIn"];
  JWT_REFRESH_EXPIRES_IN: jwt.SignOptions["expiresIn"];

  SENDGRID_API_KEY: string;
  MAIL_FROM: string;
  CLIENT_URL: string;
};

/* =========================
   VALIDATE ENV VARIABLES
========================= */

const requiredEnvVariables = [
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "SENDGRID_API_KEY",
  "MAIL_FROM",
  "CLIENT_URL",
] as const;

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

/* =========================
   SERVER CONFIG
========================= */

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  MONGODB_URI: process.env.MONGODB_URI!,

  JWT_SECRET: process.env.JWT_SECRET!,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  JWT_EXPIRES_IN:
    (process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]) || "7d",
  JWT_REFRESH_EXPIRES_IN:
    (process.env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ||
    "30d",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY!,
  MAIL_FROM: process.env.MAIL_FROM!,
  CLIENT_URL: process.env.CLIENT_URL!,
};
