const { DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');
const Position = require('./position.model');

const Order = sequelize.define(

    'orders',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'date'
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

Order.hasMany(Position, {
    foreignKey: 'orderId',
    sourceKey: 'id'
});

Position.belongsTo(Order, {
    foreignKey: 'orderId',
    sourceKey: 'id'
});

module.exports = Order;