import express from 'express';
import { createCourse, getCourse, getCourses, deleteCourse, updateCourse } from "../controllers/CourseController.js";
const router = express.Router();

router.post("/", createCourse )
router.get("/", getCourses )
router.get("/:courseId", getCourse )
router.delete("/:courseId", deleteCourse)
router.put("/:courseId", updateCourse)


export default router;