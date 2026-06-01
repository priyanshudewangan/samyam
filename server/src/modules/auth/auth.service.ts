import crypto from "crypto";
import { serverConfig } from "../../config";
import sgMail from "../../config/sendgrid";
import User from "../../models/user";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/errors/app.error";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt/token.jwt";

/* =========================
   REGISTER SERVICE
========================= */
export const registerUserService = async (email: string, password: string) => {
  const emailNormalized = email.trim().toLowerCase();
  if (!serverConfig.ALLOWED_ADMIN_EMAILS.includes(emailNormalized)) {
    throw new ForbiddenError("Registration is restricted to authorized admin emails only.");
  }

  const existingUser = await User.findOne({ email: emailNormalized });

  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const user = await User.create({
    email: emailNormalized,
    password,
  });

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/* =========================
   LOGIN SERVICE
========================= */

export const loginUserService = async (email: string, password: string) => {
  const emailNormalized = email.trim().toLowerCase();
  if (!serverConfig.ALLOWED_ADMIN_EMAILS.includes(emailNormalized)) {
    throw new ForbiddenError("Login is restricted to authorized admin emails only.");
  }

  const user = await User.findOne({ email: emailNormalized }).select("+password");

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/* =========================
   REFRESH TOKEN SERVICE
========================= */

export const refreshAccessTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token not found");
  }
  const decoded = verifyRefreshToken(refreshToken);
  const accessToken = generateAccessToken(decoded.id);
  return accessToken;
};

/* =========================
   CURRENT USER SERVICE
========================= */
export const getCurrentUserService = async (userId: string) => {
  if (!userId) {
    throw new UnauthorizedError("Unauthorized");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

/* =========================
   FORGOT PASSWORD SERVICE
========================= */
export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetPasswordToken = hashedResetToken;

  user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  await user.save({
    validateBeforeSave: false,
  });

  const resetUrl = `${serverConfig.CLIENT_URL}/reset-password/${resetToken}`;

  await sgMail.send({
    to: user.email,
    from: serverConfig.MAIL_FROM,
    subject: "Reset Your Password",
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>SAMYAM • Reset Password</title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background-color:#030303;
      font-family:Inter,Arial,sans-serif;
      color:#ffffff;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        background:
          radial-gradient(circle at top left, rgba(249,115,22,0.14), transparent 28%),
          radial-gradient(circle at bottom right, rgba(236,72,153,0.12), transparent 32%),
          #030303;
        padding:50px 18px;
      "
    >
      <tr>
        <td align="center">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              max-width:640px;
              background:rgba(255,255,255,0.04);
              border:1px solid rgba(255,255,255,0.08);
              border-radius:32px;
              overflow:hidden;
              box-shadow:
                0 25px 80px rgba(0,0,0,0.45),
                0 8px 24px rgba(249,115,22,0.08);
            "
          >
            <!-- TOP BAR -->

            <tr>
              <td
                style="
                  height:6px;
                  background:
                    linear-gradient(
                      90deg,
                      #f97316,
                      #fb923c,
                      #ec4899
                    );
                "
              ></td>
            </tr>

            <!-- CONTENT -->

            <tr>
              <td
                style="
                  padding:58px 46px 52px;
                "
              >
                <!-- LOGO -->

                <div
                  style="
                    text-align:center;
                  "
                >
                  <div
                    style="
                      width:82px;
                      height:82px;
                      margin:0 auto 22px;
                      border-radius:28px;
                      background:
                        linear-gradient(
                          135deg,
                          #f97316,
                          #ec4899
                        );
                      box-shadow:
                        0 14px 40px rgba(249,115,22,0.28);
                      text-align:center;
                      line-height:82px;
                      font-size:34px;
                      color:#ffffff;
                      font-weight:700;
                    "
                  >
                    ✦
                  </div>

                  <h1
                    style="
                      margin:0;
                      font-size:38px;
                      font-weight:900;
                      letter-spacing:0.12em;
                      color:#ffffff;
                    "
                  >
                    SAMYAM
                  </h1>

                  <p
                    style="
                      margin-top:10px;
                      font-size:12px;
                      letter-spacing:0.32em;
                      text-transform:uppercase;
                      color:rgba(255,255,255,0.42);
                    "
                  >
                    Mysticism • Dharma • Spiritual Journeys
                  </p>
                </div>

                <!-- SPACING -->

                <div style="height:42px;"></div>

                <!-- TITLE -->

                <h2
                  style="
                    margin:0;
                    text-align:center;
                    font-size:34px;
                    line-height:1.3;
                    font-weight:800;
                    color:#ffffff;
                  "
                >
                  Reset Your Password
                </h2>

                <!-- TEXT -->

                <p
                  style="
                    margin:22px auto 0;
                    max-width:500px;
                    text-align:center;
                    font-size:16px;
                    line-height:1.9;
                    color:rgba(255,255,255,0.72);
                  "
                >
                  We received a request to reset the password associated
                  with your SAMYAM account. To continue securely,
                  please click the button below.
                </p>

                <!-- BUTTON -->

                <div
                  style="
                    text-align:center;
                    margin-top:42px;
                    margin-bottom:42px;
                  "
                >
                  <a
                    href="${resetUrl}"
                    target="_blank"
                    style="
                      display:inline-block;
                      padding:18px 38px;
                      border-radius:18px;
                      background:
                        linear-gradient(
                          90deg,
                          #f97316,
                          #ec4899
                        );
                      color:#ffffff;
                      text-decoration:none;
                      font-size:16px;
                      font-weight:700;
                      letter-spacing:0.02em;
                      box-shadow:
                        0 16px 40px rgba(249,115,22,0.25);
                    "
                  >
                    Reset Password
                  </a>
                </div>

                <!-- FALLBACK URL -->

                <div
                  style="
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.06);
                    border-radius:20px;
                    padding:22px;
                  "
                >
                  <p
                    style="
                      margin:0 0 12px;
                      text-align:center;
                      font-size:13px;
                      color:rgba(255,255,255,0.5);
                    "
                  >
                    If the button above does not work,
                    copy and paste this link into your browser:
                  </p>

                  <p
                    style="
                      margin:0;
                      word-break:break-all;
                      text-align:center;
                      font-size:13px;
                      line-height:1.8;
                      color:#fb923c;
                    "
                  >
                    ${resetUrl}
                  </p>
                </div>

                <!-- INFO -->

                <div
                  style="
                    margin-top:28px;
                    padding:20px 22px;
                    border-radius:18px;
                    background:
                      linear-gradient(
                        180deg,
                        rgba(255,255,255,0.03),
                        rgba(255,255,255,0.015)
                      );
                    border:1px solid rgba(255,255,255,0.06);
                  "
                >
                  <p
                    style="
                      margin:0;
                      text-align:center;
                      font-size:14px;
                      line-height:1.9;
                      color:rgba(255,255,255,0.68);
                    "
                  >
                    This secure password reset link will expire in
                    <span
                      style="
                        color:#fb923c;
                        font-weight:700;
                      "
                    >
                      10 minutes
                    </span>.
                    If you did not request a password reset,
                    you may safely ignore this email.
                  </p>
                </div>

                <!-- FOOTER -->

                <div
                  style="
                    margin-top:44px;
                    padding-top:28px;
                    border-top:1px solid rgba(255,255,255,0.08);
                    text-align:center;
                  "
                >
                  <p
                    style="
                      margin:0;
                      font-size:13px;
                      line-height:1.8;
                      color:rgba(255,255,255,0.4);
                    "
                  >
                    © 2026 SAMYAM
                  </p>

                  <p
                    style="
                      margin-top:8px;
                      font-size:12px;
                      line-height:1.8;
                      color:rgba(255,255,255,0.28);
                    "
                  >
                    Awaken to the Mysticism of Bharat
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  });

  return {
    success: true,
    message: "Password reset email sent",
  };
};

/* =========================
   RESET PASSWORD SERVICE
========================= */
export const resetPasswordService = async (token: string, password: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,

    resetPasswordExpire: {
      $gt: new Date(),
    },
  }).select("+password");

  if (!user) {
    throw new UnauthorizedError("Reset password token is invalid or expired");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    success: true,
    message: "Password reset successful",
    accessToken,
    refreshToken,
    user,
  };
};
