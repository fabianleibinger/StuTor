import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  createCourse,
  getCourses,
  getCourse,
  getCoursesOfUniversity,
  getCoursesFilteredBySearchString,
  updateCourse,
  deleteCourse,
} from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", verifyToken, createCourse);
router.get("/", verifyToken, getCourses);
router.get("/byId/:courseId", verifyToken, getCourse);
router.get("/search", verifyToken, getCoursesFilteredBySearchString);
router.get("/ofUniversity/:universityId", verifyToken, getCoursesOfUniversity);
router.delete("/:courseId", verifyToken, deleteCourse);
router.put("/:courseId", verifyToken, updateCourse);

export default router;
