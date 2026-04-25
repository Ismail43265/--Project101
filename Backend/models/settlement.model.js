import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "online"],
    default: "online"
  },
  status: {
    type: String,
    enum: ["completed"],
    default: "completed"
  }
}, { timestamps: true });

export default mongoose.model("Settlement", settlementSchema);