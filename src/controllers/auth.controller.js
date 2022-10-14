const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');
const User = require('./../models/user.model');
const { config } = require('./../config');

const handleLogin = async (req, res) => {

    const { id, password} = req.body;
    
    const user = await User.findByPk(id);
    if ( !user ) return res.status(400).send('Invalid user id or password.');
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send('Invalid user id or password.');
    
    const token = jwt.sign({
        id: user.id,
        role: user.role,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    }, config.jwtSecret);

    const tokenSerialized = cookie.serialize('user_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24,
        path: '/'
    });

    res.setHeader('Set-cookie', tokenSerialized);
    return res.status(200).json({message : 'Login succesful'});

}

const handleLogout = async (req, res) => {
    const { myToken } = req.cookies;
    console.log(myToken); 
}

module.exports = {
    handleLogin,
    handleLogout
}