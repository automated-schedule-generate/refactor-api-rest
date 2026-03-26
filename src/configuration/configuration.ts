export default () => ({
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
  },
  environment: process.env.ENVIRONMENT,
  logging: process.env.LOGGING?.trim() === 'true',
});
