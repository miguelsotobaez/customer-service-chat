export default () => ({
  environment: process.env.ENVIRONMENT,
  port: parseInt(process.env.PORT, 10) || 3000,
  log: {
    level: process.env.LOG_LEVEL,
    file: process.env.LOG_FILE,
  },
});
