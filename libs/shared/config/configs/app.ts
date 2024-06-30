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
});
