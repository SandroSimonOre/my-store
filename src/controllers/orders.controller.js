const Order = require('../models/order.model');
const Item = require('../models/item.model');
const sequelize = require('../database/sequelize');

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.findAll({include : Item});
        res.json(orders)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// GET ONE ORDER
const getOneOrder = async (req, res) => {
    
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {include: Item})
        res.json(order)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// CREATE ONE ORDER
const createOrder =  async (req, res) => {

    const { id, date, customerId, salespersonId, items } = req.body;

    const itemsWithId = items.map( item => {
        return { id, ...item}
    });

    try {
        
        const newOrder = await Order.create({
            id,
            date,
            customerId,
            salespersonId,
            items: itemsWithId
        }, {include : Item});
        
        res.json({newOrder})
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// UPDATE ONE ORDER
const updateOrder = async (req, res) => {
    
    const { id } = req.params;

    const { date, customerId, salespersonId, items } = req.body;

    const itemsWithId = items.map( item => {
        return { orderId:id, ...item }
    });
    
    const t = await sequelize.transaction();
    try {

        await Order.update(
            { date, customerId, salespersonId },
            { where: { id }, transaction: t }
        );

        await Item.destroy( {where: { orderId: id }, transaction : t });

        for (let i = 0; i < itemsWithId.length; i++ ) {
            await Item.create(itemsWithId[i], {transaction: t} );
        }
        
        await t.commit();
        res.json(await Order.findByPk(id, {include: Item}));

    } catch (error) {
        
        await t.rollback();
        return res.status(500).json({message: error.message})
        
    }

}

// REMOVE AN ORDER
const deleteOrder = async (req, res) => {
    
    const { id } = req.params;
    
    try {
        
        await Item.destroy({
            where: { orderId : id }  
        })
        
        await Order.destroy({
            where: { id }
        });
        return res.sendStatus(204);
    
    } catch (error) {
    
        return res.status(500).json({message: error.message})
    
    }
}

module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
    updateOrder,
    deleteOrder
};