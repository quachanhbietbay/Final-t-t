import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema({
  type: String,
  school: String,
  major: String,
  year: Number,
  isGraduated: Boolean
},
 { 
    _id: false
 }
);

const teacherSchema = new mongoose.Schema({
  code: { 
    type: String, 
    unique: true 
  },

  name: {
    type:String,
   },
   email: {
    type: String,
    unique: true
   },

   phoneNumber: {
    type:String,
   },

  //  isActive: { 
  //   type: Boolean, 
  //   default: true 
  // },

  address: {
    type:String,

  },

  userId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "User", 
   },
  
  isDeleted: { 
    type: Boolean, 
    default: false
   },

  teacherPositionsId: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "TeacherPosition"
}],
  degrees: [degreeSchema]
}, 
{ 
    timestamps: true
 }
);

const teacherModel = mongoose.model("Teacher", teacherSchema);
export default teacherModel
