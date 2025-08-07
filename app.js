import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import teacherRoutes from "./routes/teacherRoute.js";
import teacherPositionRoutes from "./routes/teacherPositionRoute.js";
import teacherRoute from "./routes/teacherRoute.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
 

app.use('/api/teachers', teacherRoute);

app.use('/teacher-positions', teacherPositionRoutes);

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Kết nối MongoDB thành công");
} catch (error) {
  console.error("❌ Lỗi kết nối MongoDB:", error);

}


app.use("/teachers", teacherRoutes);
app.use("/teacher-positions", teacherPositionRoutes);


app.listen(PORT, () => {
  console.log(` Server đang chạy tại cổng ${PORT}`);
});
