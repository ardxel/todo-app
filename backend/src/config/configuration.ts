export default () => ({
  node_env: process.env.NODE_ENV,
  database: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    lifetime: process.env.JWT_LIFETIME,
  },
});
