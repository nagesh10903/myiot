const Sequelize = require('sequelize');
require("dotenv").config();

const path = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.MYSQL_DB}`;
const sequelize = new Sequelize(process.env.MYSQL_DB,process.env.DB_USER,process.env.DB_PASS, { host: process.env.DB_HOST,dialect: 'mysql' });

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});