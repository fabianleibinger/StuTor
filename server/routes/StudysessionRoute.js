import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  createStudysession,
  getStudysessions,
  getStudysession,
  getStudysessionsForCourse,
  getStudysessionsTutoredBy,
  getStudysessionsOfStudent,
  getStudysessionsFiltered,
  updateStudysession,
  deleteStudysession,
  getAverageRating,
  getReviewsOfStudysession,
} from "../controllers/StudysessionController.js";

const router = express.Router();

router.post("/", verifyToken, createStudysession);
router.get("/", verifyToken, getStudysessions);
router.get("/byId/:studysessionId", verifyToken, getStudysession);
router.get("/forCourse/:courseId", verifyToken, getStudysessionsForCourse);
router.get("/tutoredBy/:userId", verifyToken, getStudysessionsTutoredBy);
router.get("/ofStudent/:userId", verifyToken, getStudysessionsOfStudent);
router.get("/search", getStudysessionsFiltered);
router.put("/:studysessionId", verifyToken, updateStudysession);
router.delete("/:studysessionId", verifyToken, deleteStudysession);
router.get("/averageRating/:studysessionId", verifyToken, getAverageRating);
router.get("/reviews/:studysessionId", verifyToken, getReviewsOfStudysession);

export default router;
