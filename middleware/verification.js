const jwt = require('jsonwebtoken');
require("dotenv").config("./env");

function verification(req, res, next) {
    const token =  req.header('x-auth-token');
    if (!token) return res.status(401).json({
        status: 401,
        error: 'Invalid Token!'
    }).send();

    try{
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user =  decoded;
        next(); 
    }
    catch (ex) {
        res.status(400).json(
            {
                status: 400,
                error: 'Invalid token' 
            }
        ).send();
    }
}

module.exports = verification;