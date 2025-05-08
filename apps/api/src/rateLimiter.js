const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,       // 15 minutes
  max: 100,                       // limit each IP to 100 requests per windowMs
  standardHeaders: true,          // returns rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,           // disables the `X-RateLimit-*` headers
  message: {
    status: 429,
    error: 'Too many requests from this IP, please try again later.'
  }
});

module.exports = apiLimiter;
