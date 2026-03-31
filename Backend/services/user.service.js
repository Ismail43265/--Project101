const userModel=require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.createUser = async (data) => {

    const {
        fullname,
        email,
        password,
        googleId,
        avatar
    } = data;

    const firstname = fullname?.firstname;
    const lastname = fullname?.lastname;

    if (!firstname || !email) {
        throw new Error("Firstname and email are required");
    }

    if (!googleId && !password) {
        throw new Error("Password is required if not using Google login");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        googleId: googleId || null,
        avatar: avatar || undefined
    });

    return user;
};