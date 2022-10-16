const Product = require('../models/product.model')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOneProduct = async (req, res) => {
    
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id)
        res.json(product)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createProduct =  async (req, res) => {
    
    const { role } = req.userInfo;

    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});

    try {
        const { id, description, uom, stock, lastPrice, suggestedPrice } = req.body;
        
        const newProduct = await Product.create({ id, description, uom, stock, lastPrice, suggestedPrice });
        res.json({newProduct})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }  

}

const updateProduct = async (req, res) => {
    
    const { id } = req.params;
    const { role } = req.userInfo;

    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});

    try {
        const product = await Product.findByPk(id);
        
        product.set(req.body);
        await product.save();
        res.json(product);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteProduct = async (req, res) => {
    
    const { id } = req.params;
    const { role } = req.userInfo;

    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});
        
    try {
        const product = await Product.destroy({
            where: { id }
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};