const { DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');

const Order = sequelize.define(

    'orders',
    {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'order_id'
        },

        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'order_date'
        },

        customerId: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'customer_id'
        },

        salespersonId: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'salesperson_id'
        },

    },

    {
        timestamps: false,
        tableName: 'orders'
    }
)

module.exports = Order;