import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   INTERFACE
========================= */

export interface IUser extends Document {
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

/* =========================
   USER SCHEMA
========================= */
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

/* =========================
   HASH PASSWORD
========================= */

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

/* =========================
   COMPARE PASSWORD
========================= */

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

/* =========================
   GENERATE JWT TOKEN
========================= */

userSchema.methods.generateToken = function (): string {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );
};

/* =========================
   MODEL
========================= */

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
