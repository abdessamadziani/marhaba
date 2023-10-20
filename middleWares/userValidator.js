

exports.userSignupValidator=(req,res,next)=>{

    req.check('name','Name is required').notEmpty()
    req.check('email','Email is required').notEmpty().isEmail()
    req.check('password').notEmpty().isLength({min:6 , max:10}).withMessage('password must be between 6 and 10 caracters')

    const errors=req.validationErrors()
    if(errors)
        {  
            return res.status(400).json(errors)
        }    
  next() 
    
}





