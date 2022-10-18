const Product = require('../models/product.model')

const getAllProducts = async (req, res) => {

    try {
        const products = await Product.findAll();
        res.status(200).json(products);    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const createProduct =  async (req, res) => {
    
    const { role } = req.userInfo;

    if (role !== 'admin') return res.status(403).json({message: 'You are not an admin.'});

    try {
        const { id, description, uom, stock, lastPrice, suggestedPrice } = req.body;
        
        const newProduct = await Product.create({ id, description, uom, stock, lastPrice, suggestedPrice });
        if (newProduct) return res.status(200).json({newProduct});

    } catch (error) {
        return res.status(500).json({message: error.message})
    }  

}

const getOneProduct = async (req, res) => {
    
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id)
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({message: 'The product does not exist.'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateProduct = async (req, res) => {
    
    const { id } = req.params;
    const { role } = req.userInfo;

    if (role !== 'admin') return res.status(403).json({message: 'You are not an admin.'});

    try {
        const product = await Product.findByPk(id);
        
        product.set(req.body);
        await product.save();
        res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteProduct = async (req, res) => {
    
    const { id } = req.params;
    const { role } = req.userInfo;

    // Only users with the 'admin' role can remove products from the database.
    if (role !== 'admin') return res.status(403).json({message: 'You are not an admin.'});
        
    try {
        const result = await Product.destroy({ where: { id } });
        
        if (result === 1 ) return res.status(200).json({message: `The item with id ${id} was succesfully removed.`});
        if (result === 0 ) return res.status(404).json({message: `The item with id ${id} does not exist.`});
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
};