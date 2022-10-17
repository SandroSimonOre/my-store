const bcrypt = require('bcrypt');
const User = require('../models/user.model')

const getAllUsers = async (req, res) => {

    const { role } = req.userInfo;
    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});

    try {
        const users = await User.findAll();
        users.forEach(user => { return delete user.dataValues.password });
        res.json(users)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getOneUser = async (req, res) => {
    
    const { sub, role } = req.userInfo;
    const { id } = req.params;
    
    if (role !== 'admin' && id !== sub) return res.status(403).json({message: 'You are not an admin.'});
        
    try {
        const user = await User.findByPk(id);
        delete user.dataValues.password;
        res.json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createUser =  async (req, res) => {

    const { role } = req.userInfo;

    if (role !== 'admin') return res.status(403).json({message: 'You are not an admin.'});
    
    try {
        const { id, role, password, email, firstName, lastName } = req.body;
        const newUser = await User.create({
            id,
            role,
            password: await bcrypt.hash(password, 12),
            email,
            firstName,
            lastName
        });
        delete newUser.dataValues.password;
        
        res.json({newUser});

    } catch (error) {
        
        return res.status(500).json({message: error.message})
    
    }  

}

const updateUser = async (req, res) => {
    
    const { id } = req.params;
    const { sub, role } = req.userInfo;

    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});

    try {
        const user = await User.findByPk(id);
        
        user.set(req.body);
        if (user.password) user.password = await bcrypt.hash(user.password, 12);
        await user.save();
        delete user.dataValues.password;
        res.json(user);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const deleteUser = async (req, res) => {

    const { id } = req.params;
    const { sub, role } = req.userInfo;
    
    // Only users with de 'admin' rol can remove anothers users.
    if (role !== 'admin') return res.status(400).json({message: 'You are not an admin.'});

    try {
        const result = await User.destroy({ where: { id } });
        
        if (result === 1 ) return res.status(200).json({message: `The user ${id} was succesfully removed.`});
        if (result === 0 ) return res.status(404).json({message: `The user ${id} does not exist.`});
    
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