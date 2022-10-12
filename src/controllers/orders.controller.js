const Order = require('../database/models/order.model');
const Item = require('../database/models/item.model');

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

    const { 
        id,
        date,
        customerId,
        salespersonId,
        items
    } = req.body;

    const itemsWithId = items.map( e => {
        return { id, ...e}
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

    const {
        date,
        customerId,
        salespersonId,
        items
    } = req.body;

    try {

        await Order.update(
            {
                date,
                customerId,
                salespersonId,
            },
            {
                where: { id }
            }
        );

        await Item.destroy( {where: { orderId: id }} );

        const itemsWithId = items.map( item => {
            return { orderId:id, ...item }
        });

        await itemsWithId.forEach(item => {
            Item.create(item);
        });
        
        //const newOrder = await Order.findByPk(id, {include: Item})
        res.json(await Order.findByPk(id, {include: Item}));

    } catch (error) {
    
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