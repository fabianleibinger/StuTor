import express from 'express';
import { createCourse, getCourses, getCourse, updateCourse, deleteCourse } from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", createCourse )
router.get("/", getCourses )
router.get("/:courseId", getCourse )
router.delete("/:courseId", deleteCourse)
router.put("/:courseId", updateCourse)


export default router;