import mongoose from "mongoose";
import "dotenv/config";
import { serverConfig } from ".";
import logger from "./logger.config";
import User from "../models/user";

const MONGO_URL = serverConfig.MONGODB_URI!;

/**
 * =========================================================
 * DATABASE CONNECTION
 * =========================================================
 */

export const connectDB = async (): Promise<void> => {
  try {
    /**
     * =====================================================
     * MONGOOSE CONNECTION
     * =====================================================
     */

    const connection = await mongoose.connect(MONGO_URL);

    /**
     * =====================================================
     * SUCCESS LOG
     * =====================================================
     */

    logger.info(`MongoDB connected successfully: ${connection.connection.host}`);

    logger.info(`Database Name: ${connection.connection.name}`);

    // Seed default admin if user collection is empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultEmail = serverConfig.ALLOWED_ADMIN_EMAILS[0] || "admin@samyam.co";
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "samyamadmin123";
      await User.create({
        email: defaultEmail,
        password: defaultPassword,
      });
      logger.info(`Default admin user seeded: ${defaultEmail}`);
    }
  } catch (error) {
    /**
     * =====================================================
     * ERROR LOG
     * =====================================================
     */

    logger.error("MongoDB connection failed", {
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
    });

    process.exit(1);
  }
};

/**
 * =========================================================
 * CONNECTION EVENTS
 * =========================================================
 */

mongoose.connection.on("connecting", () => {
  logger.info("MongoDB connection is connecting...");
});

mongoose.connection.on("connected", () => {
  logger.info("MongoDB connection established");
});

mongoose.connection.on("open", () => {
  logger.info("MongoDB connection is open");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected successfully");
});

mongoose.connection.on("disconnecting", () => {
  logger.warn("MongoDB connection is disconnecting...");
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("close", () => {
  logger.warn("MongoDB connection closed");
});

mongoose.connection.on("error", (error: any) => {
  logger.error("MongoDB connection error", {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
});

/**
 * =========================================================
 * GRACEFUL SHUTDOWN
 * =========================================================
 */

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();

    logger.info("MongoDB connection closed due to app termination");

    process.exit(0);
  } catch (error) {
    logger.error("Error during MongoDB shutdown", {
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
    });

    process.exit(1);
  }
});
