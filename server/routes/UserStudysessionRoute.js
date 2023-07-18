import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  createUserStudysession,
  getUserStudysession,
  deleteUserStudysession,
} from "../controllers/UserStudysessionController.js";

const router = express.Router();

router.post("/", createUserStudysession);
router.get("/id/:userStudysessionId", getUserStudysession);
router.delete("/:userStudysessionId", verifyToken, deleteUserStudysession);

export default router;
