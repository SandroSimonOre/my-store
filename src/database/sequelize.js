const { Sequelize } = require('sequelize');
const { config } = require('../config')
const sequelize = new Sequelize(
    config.pgDataBase,
    config.pgUser,
    config.pgPassword,
    {
        host: config.pgHost,
        dialect: 'postgres',
        logging: false
    }

);

module.exports = sequelize;