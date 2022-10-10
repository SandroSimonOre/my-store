const { DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');

const Position = sequelize.define(

    'positions',
    {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'order_id',
            references: {
                model: 'orders',
                key: 'id'
            },
        },
        
        productId: {
            type: DataTypes.STRING(4),
            allowNull: false,
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
        tableName: 'positions'
    }
)

module.exports = Position;