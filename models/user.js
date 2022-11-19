import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: Schema.Types.ObjectId },
  phone: { type: String },
  department: { type: String },
  position: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
