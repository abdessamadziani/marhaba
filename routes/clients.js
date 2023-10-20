const express= require('express')
const {salam,signup,signin,signout,activeTrue, getOneUser,reset,checkuser,forgetpassword}= require('../controllers/clientController')
const {userSignupValidator }= require('../middleWares/userValidator')
const { requireSignIn,isAuth }= require('../middleWares/auth')
const { userById,getUser } = require('../middleWares/user')


const router = express.Router()



router.get('/',salam)
// router.get('/:token',activeTrue)
router.post('/signup',userSignupValidator,signup)
router.get('/signin',signin)
router.get('/signout',signout)
router.get('/reset/:id',requireSignIn,isAuth,reset)
router.param('id',getUser)

router.get('/profile/:token',activeTrue)
router.param('token',userById)

router.post('/checkuser',checkuser)

router.get('/forgetpassword/:token',reset)
router.param('token',userById)





router.get('/hello',requireSignIn,(req, res) => {
    res.send("hello there")
});






module.exports=router