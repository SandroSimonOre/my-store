const Customer = require('../models/customer.model')

const getAllCustomers = async (req, res) => {

    // Users with any role are able to view customers. They only need to be logged in.
    
    try {
        const customers = await Customer.findAll();
        res.json(customers)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOneCustomer = async (req, res) => {
    
    // Users with any role are able to view customers. They only need to be logged in.
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id)
        res.json(customer)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createCustomer =  async (req, res) => {
    
    const { sub, role } = req.userInfo;

    // Users with the guest role should not be able to create customers
    if (role !== 'admin' && role !== 'seller') return res.status(400).json({message: 'You do not have authorization for this action.'});
    
    try {
        const { id, email, firstName, lastName } = req.body;
        
        const newCustomer = await Customer.create({
            id,
            email,
            firstName,
            lastName,
            salespersonId:sub
        });
        res.json({newCustomer})
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }  

}

const updateCustomer = async (req, res) => {

    const { sub, role } = req.userInfo;
    const { id } = req.params;

    try {
        const customer = await Customer.findByPk(id);
        // Only Users with the admin role or users that create the resource can update a customer
        if (role === 'admin' || customer.salespersonId === sub) {
            customer.set(req.body);
            await customer.save();
            res.json(customer);
        } else {
            return res.status(403).json({message: 'You should be an admin or the resource owner to do this action.'})
        }
        

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteCustomer = async (req, res) => {
    
    const { id } = req.params;
    const { sub, role } = req.userInfo;    
    
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) return res.status(404).json({message: `The customer with id ${id} does not exist.`});
        
        // Only 'admin' or the owner are able to remove a customer.
        if (role === 'admin' || customer.salespersonId === sub) {
            await Customer.destroy({ where: { id } });
            return res.status(200).json({message: `The customer with id ${id} was successfully removed.`});
        }
        
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