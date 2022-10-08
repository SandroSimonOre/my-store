const Position = require('../database/models/position.model')

const getAllPositions = async (req, res) => {
    
    try {
        const positions = await Position.findAll();
        res.json(positions)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOnePosition = async (req, res) => {
    
    const { positionId } = req.params;
    try {
        const position = await Position.findByPk(positionId)
        res.json(position)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createPosition =  async (req, res) => {
    
    try {
        const { 
            positionId,
            orderId,
            productId,
            quantity,
            unitPrice
        } = req.body;
        
        const newPosition = await Position.create({
            positionId,
            orderId,
            productId,
            quantity,
            unitPrice
        });
        res.json({newPosition})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }  

}

const updatePosition = async (req, res) => {
    
    const { positionId } = req.params;

    try {
        const position = await Position.findByPk(positionId);
        
        position.set(req.body);
        await position.save();
        res.json(position);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deletePosition = async (req, res) => {
    const { positionId } = req.params;
        
    try {
        const position = await Position.destroy({
            where: { positionId }
        });
        return res.sendStatus(204);

    } catch (error) {

        return res.status(500).json({message: error.message})

    }
}

module.exports = {
    getAllPositions,
    getOnePosition,
    createPosition,
    updatePosition,
    deletePosition
};