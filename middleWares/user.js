const User = require('../models/User');

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userById = (req, res, next) => {
    const token = req.params.token;

    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
        if (err) {
            // Handle token verification error
            return res.status(401).json({ error: 'Token verification failed' });
        }
        
        // Use the decoded object to get the user's ID
        const userId = decoded._id;

        User.findById(userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                req.profile = user;
                next();
            })
            .catch(err => {
                return res.status(500).json({ error: 'Internal server error' });
            });
    });
};



exports.getUser = (req, res, next) => {
    const userId= req.params.id;
    console.log("userId is "+userId)
        User.findById(userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                req.profile = user;
                next();
            })
            .catch(err => {
                return res.status(500).json({ error: 'Internal server error' });
            });

};

  
