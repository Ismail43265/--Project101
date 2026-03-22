const userModel = require("../models/user.model");
const blacklistedTokenSchema = require("../models/blacklistedToken.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    
    const token =
        req.cookies?.token ||
        (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({
            message: "Authentication failed"
        });
    }

    const isBlacklistToken = await blacklistedTokenSchema.findOne({ token });

    if (isBlacklistToken) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};