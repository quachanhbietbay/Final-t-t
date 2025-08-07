import express from "express";
import teacherPositionModel from "../models/teacherPosition.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const positions = await teacherPositionModel.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, code, des, isActive } = req.body;

    const existing = await teacherPositionModel.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Mã code đã tồn tại" });
    }

    const newPosition = await teacherPositionModel.create({
      name,
      code,
      des,
      isActive
    });

    res.status(201).json(newPosition);
  } catch (error) {
    res.status(500).json({ message: error.message
     });
  }
});


router.get('/', async (req, res) => {
  try {
    const positions = await teacherPositionModel.find();
    res.status(200).json({
      success: true,
      data: positions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

router.post('/',async(req,res)=>{
  const {code,name,description} = req.body

  try {
    const existing = await teacherPositionModel.findOne({code});
    if (existing) {
      return res.status(400).json({
        message: error.message
      })
    }
    const newPosition = new teacherPositionModel({code,name,description});
    const data = await newPosition.save()
    res.status(201).json({
      message: success,
      data
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }

})

export default router;
