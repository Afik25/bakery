// Load environment variables from .env file located at the root of the project
require("dotenv").config();

// Define a function to get the correct database config based on the environment
const getDbConfig = (env) => {
  switch (env) {
    case "development":
      return {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        dialect: process.env.DEV_DB_DIALECT,
        database: process.env.DEV_DB_DATABASE_NAME,
        username: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
      };
    case "test":
      return {
        host: process.env.TEST_DB_HOST,
        port: process.env.TEST_DB_PORT,
        dialect: process.env.TEST_DB_DIALECT,
        database: process.env.TEST_DB_DATABASE_NAME,
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASSWORD,
      };
    case "production":
      return {
        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,
        dialect: process.env.PROD_DB_DIALECT,
        database: process.env.PROD_DB_DATABASE_NAME,
        username: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD,
        dialectOptions: {
          bigNumberStrings: true,
          ssl:
            process.env.NODE_ENV === "production"
              ? {
                  require: true,
                  rejectUnauthorized: false,
                  // ca: require("fs").readFileSync(
                  //   __dirname + "/mysql-ca-main.crt"
                  // ), // SSL certificates in production
                }
              : false,
        },
      };
    default:
      throw new Error(`Unknown environment: ${env}`);
  }
};

// Export the configuration for the current environment
module.exports = {
  ...getDbConfig(process.env.NODE_ENV || "development"),
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamp: false,
    underscored: true,
  },
  dialectModule: require("pg"),
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
