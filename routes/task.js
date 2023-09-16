import express from "express";
import { addTask, deleteTaskById, getAllTasks, getTaskById, updateTask } from "../controllers/task.js";

const router = express.Router();

router.post("/addTask", addTask);
router.get("/getAllTasks", getAllTasks);
router.get("/getTaskById/:id", getTaskById);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTaskById)

export default router;