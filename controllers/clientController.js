
const express = require('express');
const User = require('../models/User');
const sendEmail= require('../utils/sendEmail')

const jwt=require('jsonwebtoken')

exports.salam = (req, res) => {
    res.send({ message: "client module" });
}


exports.activeTrue = (req, res) => {
    // Update the user's account status to "active"
    User.findByIdAndUpdate(req.profile._id, { active: true })
        .exec()
        .then(updatedUser => {
            if (!updatedUser) {
                res.status(500).json({ error: 'Failed to update user account status' });
            } else {
                res.status(200).json({ message: 'Token verified and user account is now active', userId: updatedUser._id });
            }
        })
        .catch(updateErr => {
            res.status(500).json({ error: 'Failed to update user account status' });
        });
};









exports.signup = async (req, res) => {
    const user = new User(req.body);
    const { email, password } = user;

    const emailExists = await User.findOne({ email });

    if (emailExists) return res.status(400).json({ error: 'Email already exists' });




    try {
        const savedUser = await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);
        res.cookie('token', token, { expires: new Date(Date.now() + 600000) });

        const mailOptions = {
            from: 'abdessamad',
            to: savedUser.email, // Use the user's email
            subject: 'Hello',
            html:`<a href="http://localhost:3000/api/users/profile/${token}">Active Account Now</a>`
        
        }
        // Send the email here
        await sendEmail(mailOptions);

    
        res.status(200).json({ message: 'User registration successful', user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500)
        res.send('Failed to send email');
    }
}










// exports.signin =(req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ email }) 
//       .then(user => {
//           if (!user) {
//               return res.status(400).json({ error: 'User not found' });
//           }

//           if (!user.authenticate(password)) {
//               return res.status(401).json({ error: 'Email and Password do not match' });
//           }
//           if (user.active==false) {
//             return res.status(401).json({ error: 'Sorry you need to activate your aacount first check your email' });
//         }

          

//           const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);

//           res.cookie('token', token, { expires: new Date(Date.now() + 600000) });



//           const { _id, name, email, role } = user;
//           res.json({
//               token,
//               user: { _id, name, email, role }

//           });


         

//       })

//       .catch(err => {
//           console.log(err); // Handle errors properly
//           return res.status(500).json({ error: 'Internal server error' });
//       });
// }




exports.signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      if (!user.authenticate(password)) {
        return res.status(401).json({ error: 'Email and Password do not match' });
      }
  
      if (user.active === false) {
        return res.status(401).json({ error: 'Sorry, you need to activate your account first. Check your email.' });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);
  
      res.cookie('token', token, { expires: new Date(Date.now() + 600000) });
  
      const { _id, name, email, role } = user;
      res.json({
        token,
        user: { _id, name, email, role },
      });
  
    } catch (err) {
      console.log(err); // Handle errors properly
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  





  



exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({message: 'Signout'})
}



  
exports.reset = async (req, res) => {
    try {
      // Retrieve the new password from the request, e.g., req.body.newpassword
      const newPassword = req.body.newpassword;
  
      // Retrieve the user by their ID
      const user = await User.findById(req.profile._id).exec();
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // Update the virtual 'password' property
      user.password = newPassword;
  
      // Save the user model to trigger the virtual property and update the hashed_password
      const updatedUser = await user.save();
  
      res.status(200).json({ message: 'Password reset successful', userId: updatedUser._id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to reset user password' });
    }
  };





  exports.checkuser = (req, res) => {
    const { email } = req.body;
  
    User.findOne({ email }) 
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
  
        
            const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);
  
            res.cookie('token', token, { expires: new Date(Date.now() + 600000) });



            const mailOptions = {
                from: 'Marhaba Delivery',
                to: user.email, // Use the user's email
                subject: 'Hello Dear '+user.name,
                html:`<a href="http://localhost:3000/api/users/forgetpassword/${token}">Reset Password</a>`
            
            }
            // Send the email here
             sendEmail(mailOptions);


            const { _id, name, email, role } = user;
            res.json({
                token,
                user: { _id, name, email, role }
  
            });






  
        })
  
        .catch(err => {
            console.log(err); // Handle errors properly
            return res.status(500).json({ error: 'Internal server error' });
        });
  }