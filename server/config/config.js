require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_meta',
    migrationStoragePath: path.join(__dirname, '../src/migrations'),
    seederStoragePath: path.join(__dirname, '../src/seeders'),
    modelsPath: path.join(__dirname, '../src/models'),
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME || 'test_db',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.PROD_DB_NAME || 'prod_db',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  }
};
