import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
   
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  }
});

const teacherPositionModel = mongoose.model("TeacherPosition", teacherPositionSchema);
export default teacherPositionModel