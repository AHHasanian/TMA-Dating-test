import express from "express";
import {
  createUser,
  getUsers,
  getUserByTelegramId,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/telegram/:telegram_id", getUserByTelegramId);

export default router;
