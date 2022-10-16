const jwt = require('jsonwebtoken');
const { config } = require('./../config')

const validateToken = (req, res, next) => {
    let token =  req.headers['authorization'];
     
    if (!token) return res.send('Access denied');
    token = token.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err) => {
        if (err) {
            res.send('Access denied, the token has expired');
        } else {
            req.userInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            next();
        }

    })
}

module.exports = validateToken;