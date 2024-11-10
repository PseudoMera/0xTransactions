export default () => ({
  api: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    url: process.env.API_URL,
    key: process.env.API_KEY,
    rpcUrl: process.env.RPC_URL,
  },
});
