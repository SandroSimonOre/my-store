const Order = require('../database/models/order.model');
const Position = require('../database/models/position.model');
const getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.findAll({include : Position});
        
        //const orders = await Order.findAll();
        //console.log('trying')
        res.json(orders)    
    } catch (error) {
        
        return res.status(500).json({message: error.message})
    }
}

const getOneOrder = async (req, res) => {
    
    const { orderId } = req.params;
    try {
        const order = await Order.findByPk(orderId)
        res.json(order)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createOrder =  async (req, res) => {
    
    try {
        const { 
            orderId,
            orderDate,
            customerId,
            salespersonId,
        } = req.body;
        
        const newOrder = await Order.create({
            orderId,
            orderDate,
            customerId,
            salespersonId,
        });
        res.json({newOrder})
    
    } catch (error) {
    
        return res.status(500).json({message: error.message})
    
    }  

}

const updateOrder = async (req, res) => {
    
    const { orderId } = req.params;

    try {
        const order = await Order.findByPk(orderId);
        
        order.set(req.body);
        await order.save();
        res.json(order);

    } catch (error) {
    
        return res.status(500).json({message: error.message})
    
    }

}

const deleteOrder = async (req, res) => {
    
    const { orderId } = req.params;
        
    try {
        const order = await Order.destroy({
            where: { orderId }
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