import jwt from "jsonwebtoken";
import { serverConfig } from "../../config";

/* =========================
   GENERATE ACCESS TOKEN
========================= */

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    {
      id: userId,
    },
    serverConfig.JWT_SECRET,
    {
      expiresIn: serverConfig.JWT_EXPIRES_IN,
    },
  );
};

/* =========================
   GENERATE REFRESH TOKEN
========================= */

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    {
      id: userId,
    },
    serverConfig.JWT_REFRESH_SECRET,
    {
      expiresIn: serverConfig.JWT_REFRESH_EXPIRES_IN,
    },
  );
};

/* =========================
   VERIFY ACCESS TOKEN
========================= */

export const verifyAccessToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, serverConfig.JWT_SECRET) as jwt.JwtPayload;
};

/* =========================
   VERIFY REFRESH TOKEN
========================= */

export const verifyRefreshToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, serverConfig.JWT_REFRESH_SECRET) as jwt.JwtPayload;
};
