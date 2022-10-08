const Product = require('../database/models/product.model')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOneProduct = async (req, res) => {
    
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId)
        res.json(product)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createProduct =  async (req, res) => {
    
    try {
        const { 
            productId,
            productDescription,
            uom,
            stock,
            lastPrice,
            suggestedPrice
        } = req.body;
        
        const newProduct = await Product.create({
            productId,
            productDescription,
            uom,
            stock,
            lastPrice,
            suggestedPrice
        });
        res.json({newProduct})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }  

}

const updateProduct = async (req, res) => {
    
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);
        
        product.set(req.body);
        await product.save();
        res.json(product);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteProduct = async (req, res) => {
    const { productId } = req.params;
        
    try {
        const product = await Product.destroy({
            where: { productId }
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