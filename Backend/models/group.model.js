import mongoose from "mongoose";

const groupMemberSchema= new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },

    role:{
        type: String,
        enum: ["admin", "member"],
        default: "member"
    },

    joinedAt:{
        type: Date,
        default: Date.now,
    }
});

const groupSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },

    members: [groupMemberSchema],

    avatar:{
        type: String,
        default: ""
    },

    description:{
        type: String,
        default: ""
    },

    lastActivity:{
        type: Date,
        default: Date.now
    },

    settings:{
        allowMemberAdd:{
            type: Boolean,
            default: false,
        },
    },
},
{
    timestamps: true,
}
);

groupSchema.index({ "members.user": 1 });

export default mongoose.model("Group", groupSchema);