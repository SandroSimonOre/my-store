const User = require('../database/models/user.model')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOneUser = async (req, res) => {
    
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId)
        res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createUser =  async (req, res) => {
    
    try {
        const { 
            userId,
            role,
            password,
            email,
            firstName,
            lastName,
        } = req.body;
        
        const newUser = await User.create({
            userId,
            role,
            password,
            email,
            firstName,
            lastName,
        });
        res.json({newUser})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }  

}

const updateUser = async (req, res) => {
    
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);
        
        user.set(req.body);
        await user.save();
        res.json(user);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteUser = async (req, res) => {
    const { userId } = req.params;
        
    try {
        const user = await User.destroy({
            where: { userId }
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};