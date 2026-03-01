
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const loginScanner = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  keyGenerator: (req) => {
    if (req.body?.email) {
      return req.body.email.toLowerCase(); // email based limit
    }
    return ipKeyGenerator(req); // safe IPv6 handling
  },
  message: {
    success: false,
    message: "Too many login attempts for this account",
  },
});