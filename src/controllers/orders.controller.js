const Order = require('../models/order.model');
const Item = require('../models/item.model');
const sequelize = require('../database/sequelize');

// GET
const getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.findAll({include : Item});
        res.status(200).json(orders)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// POST
const createOrder =  async (req, res) => {

    const { date, customerId, items } = req.body;
    const { sub, role } = req.userInfo;
    
    // Only users with role 'admin' or 'seller are able to create orders
    if (role !== 'admin' && role !== 'seller') return res.status(403).json({message: 'You cannot create orders'});
    
    const t = await sequelize.transaction();
    try {
        
        const newOrder = await Order.create({
            date,
            customerId,
            salespersonId: sub,
        }, {transaction: t});
        
        for (let i = 0; i < items.length; i++ ) {
            await Item.create({
                orderId: newOrder.id,
                productId: items[i].productId,
                quantity: items[i].quantity,
                unitPrice: items[i].unitPrice
            }, {transaction: t});
        }

        await t.commit();
        const order = await Order.findByPk(newOrder.id, {include: Item});
        res.status(200).json(order);
    
    } catch (error) {
        await t.rollback();
        return res.status(500).json({message: error.message});
    }
}

// GET
const getOneOrder = async (req, res) => {
    
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {include: Item});
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({message: `The order with id ${id} does not exist.`});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// PUT / PATCH
const updateOrder = async (req, res) => {
    
    const { id } = req.params;
    const { sub, role } = req.userInfo;

    const { date, customerId, items } = req.body;
    const itemsWithId = items.map( item => {
        return { orderId:id, ...item }
    });
    
    const t = await sequelize.transaction();
    try {

        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({message: 'The order does not exist.'});

        if (order.salespersonId === sub || role === 'admin') {
            await Order.update(
                { date, customerId },
                { where: { id }, transaction: t }
            );
    
            await Item.destroy( {where: { orderId: id }, transaction : t });
    
            for (let i = 0; i < itemsWithId.length; i++ ) {
                await Item.create(itemsWithId[i], {transaction: t} );
            }
            
            await t.commit();
            res.status(200).json(await Order.findByPk(id, {include: Item}));
            
        } else {
            return res.status(403).json({message: 'You do not have the proper role to complete this action.'});
        }
        
    } catch (error) {
        
        await t.rollback();
        return res.status(500).json({message: error.message})
        
    }

}

// DELETE
const deleteOrder = async (req, res) => {
    
    const { id } = req.params;
    const { sub, role } = req.userInfo;
    
    const order = await Order.findByPk(id);

    if (!order) return res.status(404).json({message: `The order ${id} does not exist.`});
    
    // Only the owner of the order or a user with the 'admin' role can remove an order.
    if (order.salespersonId !== sub && role !== 'admin') return res.status(403).json({message: 'You are not authorized to perform this action.'});

    const t = await sequelize.transaction();
    try {
        
        await Item.destroy({ where: { orderId : id}, transaction: t })
        const result = await Order.destroy({ where: { id }, transaction: t });
        
        if (result === 1 ) {
            await t.commit();
            return res.status(204).json({message: `The order ${id} was successfully removed.`});
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