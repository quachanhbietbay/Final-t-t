import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  address: String,
  identity: String,
  dob: Date,
  isDeleted: { type: Boolean, default: false },
  role: { type: String, enum: ["STUDENT", "TEACHER", "ADMIN"] },
}, 
{
     timestamps: true
 }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
