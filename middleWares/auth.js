const expressJWT= require('express-jwt')
const jwt = require('jsonwebtoken');

require('dotenv').config()

exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload',
});


exports.isAuth=(req,res,next)=>{

    const user=req.profile && req.payload && (req.profile._id == req.payload._id)
    if(!user)
        { 
            res.status(403).json({ message: "Access Denied" })
 
        }
        next()
}





