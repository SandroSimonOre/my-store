const Customer = require('../database/models/customer.model')

const getAllCustomers = async (req, res) => {
    
    try {
        const customers = await Customer.findAll();
        res.json(customers)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOneCustomer = async (req, res) => {
    
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id)
        res.json(customer)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createCustomer =  async (req, res) => {
    
    try {
        const { id, email, firstName, lastName } = req.body;
        
        const newCustomer = await Customer.create({ id, email, firstName, lastName });
        res.json({newCustomer})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }  

}

const updateCustomer = async (req, res) => {
    
    const { id } = req.params;

    try {
        const customer = await Customer.findByPk(id);
        
        customer.set(req.body);
        await customer.save();
        res.json(customer);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteCustomer = async (req, res) => {
    const { id } = req.params;
        
    try {
        const customer = await Customer.destroy({
            where: { id }
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllCustomers,
    getOneCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};