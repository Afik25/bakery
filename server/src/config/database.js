require("dotenv").config("../.env");
module.exports = {
  host: process.env.APP_ENV === 'dev' ?  process.env.DEV_DB_HOST : process.env.APP_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.PROD_DB_HOST,
  port: process.env.APP_ENV === 'dev' ?  process.env.DEV_DB_PORT : process.env.APP_ENV === 'test' ? process.env.TEST_DB_PORT : process.env.PROD_DB_PORT,
  dialect: process.env.APP_ENV === 'dev' ?  process.env.DEV_DB_DIALECT : process.env.APP_ENV === 'test' ? process.env.TEST_DB_DIALECT : process.env.PROD_DB_DIALECT,
  dialectModule: require('pg'),
  database: process.env.APP_ENV === 'dev' ?  process.env.DEV_DB_DATABASE_NAME : process.env.APP_ENV === 'test' ? process.env.TEST_DB_DATABASE_NAME : process.env.PROD_DB_DATABASE_NAME,
  username: process.env.APP_ENV === 'dev' ?  process.env.DEV_DB_USER : process.env.APP_ENV === 'test' ? process.env.TEST_DB_USER : process.env.PROD_DB_USER,
  password: process.env.APP_ENV === 'dev' ?  process.env.DEV_DB_PASSWORD : process.env.APP_ENV === 'test' ? process.env.TEST_DB_PASSWORD : process.env.PROD_DB_PASSWORD,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamp: false,
    underscored: true,
  },
  dialectOptions: {
    bigNumberStrings: true,
    // it must be decomment for production's mode
    // ssl: {
    //   ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
    // },
  },
};
