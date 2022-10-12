const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Item = sequelize.define(

    'items',
    {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'order_id',
            references: {
                model: 'orders',
                key: 'id'
            },
        },
        
        productId: {
            type: DataTypes.STRING(4),
            primaryKey: true,
            field: 'product_id'
        },

        quantity: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            field: 'quantity'
        },

        unitPrice: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            field: 'unit_price'
        }
        
    },

    {
        timestamps: false,
        tableName: 'items'
    }
)

module.exports = Item;