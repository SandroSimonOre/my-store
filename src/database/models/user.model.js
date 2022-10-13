const { DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');

const User = sequelize.define(
    'users',
    {
        userId: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },

        role: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(50),
            //validate: { is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
            validate: {isEmail: true,},
            allowNull: false,
            
        },

        firstName : {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'first_name'
        },

        lastName : {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'last_name'
        },

    },

    {
        timestamps: false,
        tableName: 'users'
    }
)

module.exports = User;