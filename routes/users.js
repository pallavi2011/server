import express from "express";
import { editUser } from "../controllers/users.js";

const router = express.Router();

router.put("/editUser/:id", editUser);


export default router;