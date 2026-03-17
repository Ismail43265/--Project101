const model=require("../models/user.model");
const userService=require("../services/user.service");
const {validationResult}=require("express-validator");

module.exports.signup= async (req,res,next)=>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { fullname, email, password, googleId, avatar } = req.body;

        let hashedPassword;

        if (!googleId && password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword, 
            googleId,
            avatar
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });

    } catch (err) {
        next(err);
    }
};