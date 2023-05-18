import express from "express";
import {
  createUniversity,
  getUniversity,
  deleteUniversity,
  updateUniversity,
} from "../controllers/university.controller.js";

const router = express.Router();

router.post("/", createUniversity )
router.get("/:universityId", getUniversity )
router.delete("/:id", deleteUniversity)
router.put("/:id", updateUniversity)

export default router;