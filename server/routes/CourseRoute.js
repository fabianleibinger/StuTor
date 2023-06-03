import express from 'express';
import { createCourse, getCourses, getCourse, getCoursesOfUniversity, updateCourse, deleteCourse } from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/id/:courseId", getCourse);
router.get("/ofUniversity/:universityId", getCoursesOfUniversity);
router.delete("/:courseId", deleteCourse);
router.put("/:courseId", updateCourse);


export default router;