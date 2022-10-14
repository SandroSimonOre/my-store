const { DataTypes } = require('sequelize');
const sequelize = require('./../database/sequelize');

const Product = sequelize.define(

    'products',
    {
        id: {
            type: DataTypes.STRING(4),
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },

        description: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'description'
        },

        uom: {
            type: DataTypes.STRING(3),
            allowNull: false,
            field: 'uom'
        },

        stock: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            field: 'stock'
        },

        lastPrice: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            field: 'last_price'
        },

        suggestedPrice: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            field: 'suggested_price'
        },

    },

    {
        timestamps: false,
        tableName: 'products'
    }
)

module.exports = Product;