const userModel=require("../models/user.model");
const userService=require("../services/user.service");
const {validationResult}=require("express-validator");
const bcrypt = require("bcrypt");
const blacklistTokenModel = require("../models/blacklistedToken.model");

module.exports.signup= async (req,res,next)=>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { fullname, email, password, googleId, avatar } = req.body;

        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "Email is already logged in"
            });
        }

        let hashedPassword;

        if (!googleId && password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const user = await userService.createUser({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword, 
            googleId,
            avatar
        });

        const token = await user.generateAuthToken();

        res.status(201).json({
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                avatar: user.avatar,
                friends: user.friends
            }
        });

    } catch (err) {
        next(err);
    }
};


module.exports.login= async (req,res,next)=>{
    try{
        const error=validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({
                errors: error.array()
            });
        }

        const { email, password, googleId}= req.body;

        const user=await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "User does not exist"
            });
        }

       if (googleId) {
            if (user.googleId !== googleId) {
                return res.status(400).json({
                    message: "Invalid Google login"
                });
            }

            
            const token = await user.generateAuthToken();

            res.cookie("token", token, {
                httpOnly: true
            });

            return res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    avatar: user.avatar,
                    friends: user.friends
                }
            });
        }
        // 🔥 NORMAL LOGIN
        else {
            if (!password) {
                return res.status(400).json({
                    message: "Password is required"
                });
            }

            if (!user.password) {
                return res.status(400).json({
                    message: "This account uses Google login"
                });
            }

            const isMatch = await user.comparePassword(password); 

        if(!isMatch){
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }

        const token=await user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true
        });

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                avatar: user.avatar,
                friends: user.friends
            }
        });
    }
    }
    catch(error){
        next(error);
    }
    
}


module.exports.profile= async (req,res,next)=>{
    return res.status(200).json(req.user)
}

module.exports.logout = async (req, res, next) => {

    const token = req.cookies?.token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    res.clearCookie("token");

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logged out" });
}