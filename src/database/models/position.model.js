const { DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');

const Position = sequelize.define(

    'positions',
    {
        positionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'position_id'
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'order_id'
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