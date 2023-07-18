import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  createUniversity,
  getUniversities,
  getUniversity,
  deleteUniversity,
  updateUniversity,
} from "../controllers/UniversityController.js";

const router = express.Router();

router.post("/", verifyToken, createUniversity);
router.get("/", verifyToken, getUniversities);
router.get("/byId/:universityId", verifyToken, getUniversity);
router.put("/:universityId", verifyToken, updateUniversity);
router.delete("/:universityId", verifyToken, deleteUniversity);

export default router;
