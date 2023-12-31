import express from "express";
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
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", createStudysession);
router.get("/", getStudysessions);
router.get("/byId/:studysessionId", getStudysession);
router.get("/forCourse/:courseId", getStudysessionsForCourse);
router.get("/tutoredBy/:userId", getStudysessionsTutoredBy);
router.get("/ofStudent/:userId", getStudysessionsOfStudent);
router.get("/search", getStudysessionsFiltered);
router.put("/:studysessionId", verifyToken, updateStudysession);
router.delete("/:studysessionId", verifyToken, deleteStudysession);
router.get("/averageRating/:studysessionId", getAverageRating);
router.get("/reviews/:studysessionId", getReviewsOfStudysession);

export default router;
