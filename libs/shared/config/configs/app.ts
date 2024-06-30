export default () => ({
  ports: {
    api: process.env.API_PORT,
  },
  grpc: {
    payment: process.env.PAYMENT_GRPC_URI,
  },
  stripe: {
    sk: process.env.STRIPE_SECRET_KEY,
  },
  session: {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
  },
  rateLimit: {
    auth: {
      max: process.env.RATE_LIMIT_AUTH_TTL || 10,
      ttl: process.env.RATE_LIMIT_AUTH_MAX || 60000, // 1 minutes
    },
  },
});
