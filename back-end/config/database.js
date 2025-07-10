const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;
try {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
    }
  );
} catch (error) {
  sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL);
}

module.exports = sequelize;