const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserSchema');
dotenv.config({path: './config.env'})

const authenticate = async (req, res, next)=> {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const rootuser = await User.findOne({_id: verifyToken._id, "tokens.token": token})
        if(!rootuser) {throw new Error('User not Found')}

        req.token = token;
        req.rootuser = rootuser;
        req.userId = rootuser._id;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized Access')
        console.log(err)
    }
};

module.exports = authenticate;