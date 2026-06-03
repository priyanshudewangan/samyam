# Security Audit Report: Samyam Admin Dashboard

This document outlines the security vulnerabilities identified during the audit and provides actionable fixes for each.

## 1. Session Token Exposure (XSS Vulnerability)
*   **Issue:** The `accessToken` is stored in `localStorage` in the frontend (`admin.login.tsx`).
*   **Risk:** `localStorage` is accessible via JavaScript. If a hacker successfully executes a Cross-Site Scripting (XSS) attack, they can steal the admin token and gain full access to the dashboard without a password.
*   **Fix:** 
    *   **Backend:** Update the login controller to send the token in an **HttpOnly, Secure, and SameSite=Strict cookie**.
    *   **Frontend:** Remove logic that reads from `localStorage`. The browser will automatically include the cookie in API requests.

## 2. Brute-Force & Denial of Service (DoS)
*   **Issue:** The authentication endpoints (`/api/v1/auth/login`) have no rate-limiting.
*   **Risk:** A hacker can use automated scripts to try thousands of password combinations per minute until they find the correct one (Brute-Force). They can also overwhelm the server with requests.
*   **Fix:** 
    *   Implement `express-rate-limit` middleware on all auth routes.
    *   Limit login attempts to 5 per 15 minutes per IP address.

## 3. Admin Email Enumeration
*   **Issue:** The server returns a specific `ForbiddenError` if an email is not in the `ALLOWED_ADMIN_EMAILS` whitelist *before* checking the password.
*   **Risk:** A hacker can "probe" the system with different emails. If the server says "Login restricted," the hacker knows that email is not an admin. If it says "Invalid credentials," the hacker has confirmed a valid admin email to target.
*   **Fix:** 
    *   In `auth.service.ts`, return a generic error message: *"Invalid email or password"* for both cases (email not in whitelist OR wrong password).

## 4. Lack of Request Validation
*   **Issue:** Several routes lack strict input validation schemas.
*   **Risk:** This opens the door for NoSQL injection or malformed data that could crash the server.
*   **Fix:** 
    *   Create Zod validation schemas for every POST/PUT route.
    *   Use the existing `validateRequestBody` middleware in all route definitions.

## 5. Weak Password Policy
*   **Issue:** The minimum password length is currently set to 6 characters.
*   **Risk:** Short passwords are significantly easier to crack using modern hardware.
*   **Fix:** 
    *   Increase `minlength` in `models/user.ts` to at least 10-12 characters.
    *   Include requirements for symbols and numbers.

## 6. Single Factor Authentication (SFA)
*   **Issue:** The dashboard relies solely on a password for access.
*   **Risk:** If an admin password is leaked or phished, the entire system is compromised.
*   **Fix:** 
    *   Consider implementing Two-Factor Authentication (2FA) using TOTP (like Google Authenticator) or email-based OTP.

---
**Status:** These issues have been documented. Implementation of fixes is recommended for production environments.
