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
        const order = await Order.findByPk(id, {include: Item});
        res.json(order);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// CREATE ONE ORDER
const createOrder =  async (req, res) => {

    const { id, date, customerId, items } = req.body;
    const { sub, role } = req.userInfo;
    if (role !== 'admin' && role !== 'seller') return res.send('You cannot create orders');
    
    const itemsWithId = items.map( item => {
        return { id, ...item}
    });

    try {
        
        const newOrder = await Order.create({
            id,
            date,
            customerId,
            salespersonId: sub,
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
    const { sub, role } = req.userInfo;

    const { date, customerId, salespersonId, items } = req.body;
    const itemsWithId = items.map( item => {
        return { orderId:id, ...item }
    });
    
    const t = await sequelize.transaction();
    try {

        const order = await Order.findByPk(id);
        if (order.salespersonId === sub || role === 'admin') {
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
            
        } else {
            return res.send('No puedes hacer esto')
        }
        
    } catch (error) {
        
        await t.rollback();
        return res.status(500).json({message: error.message})
        
    }

}

// REMOVE AN ORDER
const deleteOrder = async (req, res) => {
    
    const { id } = req.params;
    const { sub, role } = req.userInfo;
    
    const order = await Order.findByPk(id);

    if (!order) return res.status(404).json({message: `The order ${id} does not exist.`});
    
    // Only the owner of the order or a user with the 'admin' role can remove an order.
    if (order.salespersonId !== sub && role !== 'admin') return res.status(401).json({message: 'You are not authorized to perform this action.'});

    const t = await sequelize.transaction();
    try {
        
        await Item.destroy({ where: { orderId : id}, transaction: t })
        const result = await Order.destroy({ where: { id }, transaction: t });
        
        if (result === 1 ) {
            await t.commit();
            return res.status(200).json({message: `The order ${id} was successfully removed.`});
        }
    
    } catch (error) {

        await t.rollback();
        return res.status(500).json({message: error.message});

    }
}

module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
    updateOrder,
    deleteOrder
};