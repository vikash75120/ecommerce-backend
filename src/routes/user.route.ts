import express from "express";
const router = express.Router();
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";


router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;