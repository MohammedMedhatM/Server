import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = mongoose.Schema({
  name: { type: String },
  patient_id: { type: String },
  age: { type: String },
  id: { type: String },
  diagnosis: { type: String },
  details: { type: String },
  medical: { type: [String] },
  image: { type: [String] },
  department: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  reply: { type: String },
  accept: { type: String },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
