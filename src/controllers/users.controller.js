const User = require('../models/user.model')

const getAllUsers = async (req, res) => {

    const { role } = req.userInfo;
    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});

    try {
        const users = await User.findAll();
        res.json(users)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOneUser = async (req, res) => {
    
    const { sub, role } = req.userInfo;
    const { id } = req.params;
    
    if (role !== 'admin' && id !== sub) return res.status(400).json({message: 'You are not an admin.'});
        
    try {
        const user = await User.findByPk(id);
        res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createUser =  async (req, res) => {

    const { role } = req.userInfo;

    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});
    
    try {
        const { id, role, password, email, firstName, lastName } = req.body;
        
        const newUser = await User.create({ id, role, password, email, firstName, lastName });
        delete newUser.dataValues.password;
        
        res.json({newUser});

    } catch (error) {
        
        return res.status(500).json({message: error.message})
    
    }  

}

const updateUser = async (req, res) => {
    
    const { id } = req.params;
    const { sub, role } = req.userInfo;

    if (role !== 'admin' && id !== sub) return res.status(400).json({message: 'You are not an admin.'});

    try {
        const user = await User.findByPk(id);
        
        user.set(req.body);
        await user.save();
        res.json(user);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteUser = async (req, res) => {

    const { id } = req.params;
    const { sub, role } = req.userInfo;

    if (role !== 'admin' && id !== sub) return res.status(400).json({message: 'You are not an admin.'});

    try {
        const user = await User.destroy({
            where: { id }
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