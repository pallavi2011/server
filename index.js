import express from "express";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js"
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express()


app.use(express.json({extended: false}));
app.use(cookieParser());
app.use(cors());
const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/users", userRoutes)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));