const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters']
        },
        lastname:{
            type: String,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: function(){
            return !this.googleId;
        }
    },
    googleId:{
        type: String,
        default:null
    },
    avatar:{
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    timestamps: true

});

userSchema.methods.generateAuthToken= async function () {
    const token= jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: '24h'})
    return token;
}

userSchema.methods.hashPassword= async function (password) {
    return await bcrypt.hash(password,10);
}
userSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password, this.password);
}


const userModel= mongoose.model("user", userSchema);
module.exports=userModel;
