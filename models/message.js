import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = mongoose.Schema({
  message: { type: String },
  sender: { type: String },
  receiver: { type: String },
  id: { type: String },
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
