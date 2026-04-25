const mongoose= require("mongoose");

const expenseSchema = new mongoose.Schema({
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Group"
    },
    paidBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    },
    amaount:{
        type: Number,
        required: true
    },
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    splitDetail:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        amount: Number,
    }],
    paymentMethod:{
        type: String,
        enum: ["cash", "online"],
        default: ""
    },
    billImage:{
        type: String,
        default:""
    }
},
{timestamps: true}
);

module.exports= mongoose.model("expense", expenseSchema);