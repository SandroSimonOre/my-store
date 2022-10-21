const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');
const { config } = require('./../config');

const handleLogin = async (req, res) => {

    const { id, password} = req.body;
    
    const user = await User.findByPk(id);
    if ( !user ) return res.status(400).send('Invalid user id or password.');
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send('Invalid user id or password.');
    
    const token = jwt.sign({
        sub: user.id,
        role: user.role,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    }, config.jwtSecret);

    return res.status(200).json({success : true, token});
    /*
    res.header('Authorization', token).json(
        { 
            success : true,
            token
        }
    )
    */
}

const handleChangePassword = async (req, res) => {
    
    const { currentPassword, newPassword} = req.body;
    const { sub, role } = req.userInfo;
    
    if (role === 'guest') return res.status(403).json({message: 'Users with guest role cannot change his/her password.'})
    const user = await User.findByPk(sub);
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (isValid) {
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        res.status(200).json({message: 'Password has been changed successfully.'})
    } else {
        return res.status(400).send('The password provided is not valid.');    
    };   
} 


module.exports = {
    handleLogin,
    handleChangePassword
}