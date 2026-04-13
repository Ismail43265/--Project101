const mongoose =require("mongoose");

const notificationSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    type: {
        type: String,
        enum:[
            "FRIEND_REQUEST",
            "REQUEST_ACCEPTED",
            "EXPENSE_ADDED",
            "PAYMENT_RECEIVED"
        ],
        required: true
    },
    message:{
        type: String,
        required: true
    },

    relatedId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },

    isRead:{
        type: Boolean,
        default: false
    }
},
    {timestamps: true},
)

notificationSchema.index({userId:1, createdAt: -1});

const notiModel= mongoose.model("Notification", notificationSchema);
module.exports=notiModel;