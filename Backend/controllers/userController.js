const userModel=require("../models/user.model");
const userService=require("../services/user.service");
const {validationResult}=require("express-validator");
const bcrypt = require("bcrypt");
const blacklistTokenModel = require("../models/blacklistedToken.model");
const Notification= require("../models/Notification.model.js");
const {getIO}= require("../Socket.cjs");


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

module.exports.userSearch = async (req, res, next) => {
  try {
    const { query } = req.query;

    const users = await userModel.find({
      $or: [
        { "fullname.firstname": { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ],
      _id: { $ne: req.user._id }
    }).select("_id fullname email avatar friendRequests friends");

    const result = users.map((u) => {
      let status = null;

      // ✅ already friend
      if (req.user.friends.some(f => f.toString() === u._id.toString())) {
        status = "friend";
      }

      // ✅ YOU sent request
      else if (
        u.friendRequests.some(r => r.from.toString() === req.user._id.toString())
      ) {
        status = "pending";
      }

      // ✅ YOU received request
      else if (
        req.user.friendRequests.some(r => r.from.toString() === u._id.toString())
      ) {
        status = "received";
      }

      return {
        _id: u._id,
        fullname: u.fullname,
        avatar: u.avatar,
        status
      };
    });

    res.status(200).json(result);

  } catch (err) {
    next(err);
  }
};

module.exports.friendRequest= async (req,res,next)=>{
    try{
        const {toUserId}= req.body;

        if(toUserId.toString() === req.user._id.toString()){
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

        const alreadyFriend = toUser.friends.some(
            id => id.toString() === req.user._id.toString()
            );

        if (alreadyFriend) {
            return res.status(400).json({
            message: "Already friends"
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
       const reverseRequest = req.user.friendRequests.some(
            reqItem => reqItem.from.toString() === toUserId.toString()
            );

        if (reverseRequest) {
            return res.status(400).json({
                message: "User already sent you a request"
            });
        }
       toUser.friendRequests.push({ from: req.user._id });

        await toUser.save();

        const io=getIO();

        const notification= await Notification.create({
            userId: toUserId,
            type: "FRIEND_REQUEST",
            message: `${req.user.fullname.firstname} sent you Friend request`
        });

        console.log("Notification created:", notification);

        io.to(toUserId.toString()).emit("new_notification", notification)

        res.status(200).json({ message: "Friend request sent" });
    }
    catch(err){
        console.error("NOTIFICATION ERROR:", err);
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

        const io=getIO();

        const notification= Notification.create({
            userId: fromUserId,
            type: "REQUEST_ACCEPTED",
            message: `${req.user.fullname.firstname} Accepted your friend request`
        })

        io.to(fromUserId.toString()).emit("new_notification", notification);

        res.status(200).json({ message: "Friend request accepted" });

    } catch (err) {
        next(err);
    }
};

module.exports.rejectRequest = async (req,res,next)=>{
    try{
        const {fromUserId}=req.body;

        const user= await userModel.findById(req.user._id);

        const requestExist= user.friendRequests.some(
            reqItem => reqItem.from.toString()==fromUserId
        );

        if(!requestExist){
            return res.status(400).json({
                message: "req does not exist"
            });
        }

        user.friendRequests= user.friendRequests.filter(
            reqItem => reqItem.from.toString()!==fromUserId
        );

        await user.save();

        res.status(200).json({
            message: "Friend request rejected"
        });
    }
    catch(err){
        next(err);
    }
}

module.exports.getFriendRequests = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
            .populate("friendRequests.from", "fullname avatar email");

        res.status(200).json(user.friendRequests);
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