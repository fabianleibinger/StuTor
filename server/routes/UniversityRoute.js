import express from "express";
import {
  createUniversity,
  getUniversity,
  deleteUniversity,
  updateUniversity,
} from "../controllers/UniversityController.js";

const router = express.Router();

router.post("/", createUniversity )
router.get("/:universityId", getUniversity )
router.delete("/:universityId", deleteUniversity)
router.put("/:universityId", updateUniversity)

export default router;