const express= require('express')
const {salam,signup,signin,signout,activeTrue, getOneUser,reset,checkuser,forgetpassword}= require('../controllers/clientController')
const {userSignupValidator }= require('../middleWares/userValidator')
const { requireSignIn,isAuth }= require('../middleWares/auth')
const { userById,getUser } = require('../middleWares/user')


const router = express.Router()



// router.get('/',salam)
/**
* @swagger
* /api/users/signup:
*   post:
*     tags:
*       - Signup
*     summary: Signup a new user
*     description: This endpoint allows users to register a new account.
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: body
*         name: user
*         description: User object containing registration details
*         required: true
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             email:
*               type: string
*             password:
*               type: string

*             role:
*               type: string

*     responses:
*       200:
*         description: Registration success
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: success
*             message:
*               type: string
*               example: Registration success, Please verify your email
*             token:
*               type: string
*               example: <token>
*       400:
*         description: Bad Request
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: failed
*             message:
*               type: string
*               example: All field are required

*       500:
*         description: Internal Server Error
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: failed
*             message:
*               type: string
*               example: Unable to register
*/
 router.post('/signup',userSignupValidator,signup)
/**
* @swagger
* /api/users/signin:
*   post:
*     tags:
*       - Signin
*     summary: Signin a new user
*     description: This endpoint allows users to signin.
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: body
*         name: user
*         description: User object containing signin details
*         required: true
*         schema:
*           type: object
*           properties:

*             email:
*               type: string
*             password:
*               type: string

*     responses:
*       200:
*         description: Signin success
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: success
*             message:
*               type: string
*               example: Signin success
*             token:
*               type: string
*               example: <token>
*       400:
*         description: Bad Request
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: failed
*             message:
*               type: string
*               example: All field are required

*       500:
*         description: Internal Server Error
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: failed
*             message:
*               type: string
*               example: Faild to Signin
*/
router.post('/signin',signin)
/**
* @swagger
* /api/users/signin:
*   get:
*     tags:
*       - Signout
*     summary: Signout user
*     description: This endpoint allows users to signout.
*     responses:
*       200:
*         description: Signout success
*/
router.get('/signout',signout)
router.get('/reset/:id',requireSignIn,isAuth,reset)
router.param('id',getUser)

router.get('/profile/:token',activeTrue)
router.param('token',userById)

router.post('/checkuser',checkuser)
/**
* @swagger
* /api/users/checkuser:
*   post:
*     tags:
*       - Forgetpassword
*     summary: user forgetpassword
*     description: This endpoint allows users to Reset a new passowrd if user forgot his/her password
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: body
*         description: User object containing signin details
*         schema:
*           type: object
*           properties:

*             email:
*               type: string


*     responses:
*       200:
*         description: Check your email to reset a new password
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: success
*             message:
*               type: string
*               example: User account existe success
*             token:
*               type: string
*               example: <token>
*       400:
*         description: Bad Request
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: failed
*             message:
*               type: string
*               example: Email field are required

*       500:
*         description: Internal Server Error
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*               example: failed
*             message:
*               type: string
*               example: Faild to reset password
*/
router.post('/forgetpassword/:token',reset)
router.param('token',userById)








module.exports=router