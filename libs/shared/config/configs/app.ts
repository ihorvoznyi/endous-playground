export default () => ({
  ports: {
    api: process.env.API_PORT,
  },
  grpc: {
    payment: process.env.PAYMENT_GRPC_URI,
  },
});
