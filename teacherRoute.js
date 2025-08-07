import express from "express";
import teacherModel from "../models/teacher.js";
import userModel from "../models/users.js";
import teacherPositionModel from "../models/teacherPosition.js";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await teacherModel.countDocuments();
    const teachers = await teacherModel.find()
      .skip(skip)
      .limit(limit)
      .populate("userId")
      .populate("teacherPositionsId");

    const result = teachers.map((teacher) => {
      const user = teacher.userId;

      const positions = teacher.teacherPositionsId.map((pos) => ({
        name: pos.name,
        code: pos.code,
        description: pos.des
      }));

      const degrees = teacher.degrees.map((degree) => ({
        type: degree.type,
        school: degree.school,
        major: degree.major,
        year: degree.year,
        isGraduated: degree.isGraduated
      }));

      return {
        code: teacher.code,
        isActive: teacher.isActive,
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
        positions,
        degrees
      };
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: result,
      total,
      totalPages,
      page,
      pageSize: limit 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/////////////////////////////



router.post("/", async (req, res) => {
  try {
    const { email, userId, phoneNumber, address, isActive, degrees, teacherPositions } = req.body;

    
    const emailExisted = await teacherModel.findOne({ email });
    if (emailExisted) {
      return res.status(400).json({ message: "Email already exists" });
    }

    
    let code;
    let isDuplicate = true;
    while (isDuplicate) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      code = `GV${randomNum}`;
      const existing = await teacherModel.findOne({code});
      if (!existing) isDuplicate = false;
    }

    
    const newTeacher = new teacherModel({
      code,
      email,
      userId,
      phoneNumber,
      address,
      isActive,
      degrees,
      teacherPositions
    });

    await newTeacher.save();
    res.status(201).json({
      message: "Teacher created successfully",
      teacher: newTeacher
     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;

