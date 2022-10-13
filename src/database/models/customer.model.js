const { DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');

const Customer = sequelize.define(
    'customers',
    {
        id: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
            field: 'id'
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
        tableName: 'customers'
    }
)

module.exports = Customer;