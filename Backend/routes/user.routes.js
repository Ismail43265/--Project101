const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const userController=require("../controllers/userController")
const authMiddleware=require("../middlewares/auth.middleware");


router.post('/signup',[
    body('fullname.firstname')
        .notEmpty().withMessage('First name must require')
        .isLength({min: 3}).withMessage('First name must be at least 3 characters'),
    body('fullname.lastname')
        .optional()
        .isLength({min: 3}).withMessage('Name should be min 3 letters'),

    body('email')
        .notEmpty().withMessage('There must be an email')
        .isEmail().withMessage('Invalid Email')
        .normalizeEmail(),
    body('password')
        .custom((value,{req})=>{
            if (!req.body.googleId && !value) {
                throw new Error("Password is required if not using Google login");
            }
            if (value && value.length < 6) {
                throw new Error("Password must be at least 6 characters");
            }
            return true;
        }),
    body('googleId')
        .optional()
        .isString().withMessage('Google ID must be string'),

    body('avatar')
        .optional()
        .isURL().withMessage('Avatar must be a valid URL')
] ,userController.signup);

router.post('/login', [
    body('email')
        .notEmpty().withMessage("Fill the Email")
        .isEmail().withMessage("Invalid Email"),
    body('password')
     .custom((value, {req})=>{
        if(!req.body.googleId && !value){
            throw new Error("Password is required if not using Google Id")
        }
        if(value && value.length < 6){
            throw new Error("Password should be at least 6 leters");
        }
        return true;
     }),
     body('googleId')
        .optional()
        .isString().withMessage("Google id should be string")
     
], userController.login);

router.get('/profile', authMiddleware.authUser, userController.profile)

router.post('/logout', authMiddleware.authUser, userController.logout)

module.exports=router