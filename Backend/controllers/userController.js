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
         res.cookie("token", token, {
                httpOnly: true
            });

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

module.exports.userSearch= async (req,res,next)=>{
    try{
        const {query}= req.query;

        const users=await  userModel.findOne({
            $or: [
                {"fullname.firstname": {$regex: query, $options:"i"}},
                {email: {$regex: query, $options:"i"}}
            ],
            _id: {$ne: req.user._id}
        }).select("_id fullname email avatar");

        res.status(200).json(users);
    }
    catch(err){
        next(err);
    }
}

module.exports.friendRequest= async (req,res,next)=>{
    try{
        const {toUserId}= req.body;

        if(toUserId === req.user._id){
            return res.status(400).json({
                message:"You cant send request to Yourself"
            });
        }

        const toUser=await userModel.findById(toUserId);
        if(!toUser){
            return res.status(400).json({
                message: "User not found"
            });
        }

        if(toUser.friendRequests.includes(req.user._id)){
            return res.status(400).json({
                message: "You are already a friend"
            });
        }

       const alreadyRequested=toUser.friendRequests.some(
        reqItem => reqItem.from.toString() === req.user._id.toString()
       );

       if(alreadyRequested){
        return res.status(400).json({
                message: "Friend reques already sent"
            });
       }
       toUser.friendRequests.push({ from: req.user._id });

        await toUser.save();

        res.status(200).json({ message: "Friend request sent" });
    }
    catch(err){
        next(err);
    }
}


module.exports.acceptRequest = async (req, res, next) => {
    try {
        const { fromUserId } = req.body;

        const user = await userModel.findById(req.user._id);
        const fromUser = await userModel.findById(fromUserId);

        if (!fromUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // add to friends both side
        user.friends.push(fromUserId);
        fromUser.friends.push(req.user._id);

        // remove request
        user.friendRequests = user.friendRequests.filter(
            reqItem => reqItem.from.toString() !== fromUserId
        );

        await user.save();
        await fromUser.save();

        res.status(200).json({ message: "Friend request accepted" });

    } catch (err) {
        next(err);
    }
};

module.exports.getFriends = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
            .populate("friends", "_id fullname email avatar");

        res.status(200).json(user.friends);

    } catch (err) {
        next(err);
    }
};