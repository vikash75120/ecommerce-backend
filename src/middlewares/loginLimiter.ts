import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // limit each IP to 5 requests per window
  message: { error: { message: 'Too many login attempts, try again later' } },
});
