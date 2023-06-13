import express from 'express';
import { 
    createStudysession, 
    getStudysessions, 
    getStudysession, 
    getStudysessionsForCourse,
    getStudysessionsTutoredBy,
    getStudysessionsOfStudent,
    updateStudysession, 
    deleteStudysession, 
    getAverageRating
} from '../controllers/StudysessionController.js';

const router = express.Router();

router.post('/', createStudysession);
router.get('/', getStudysessions);
router.get('/:studysessionId', getStudysession);
router.get('/forCourse/:courseId', getStudysessionsForCourse);
router.get('/tutoredBy/:userId', getStudysessionsTutoredBy);
router.get('/ofStudent/:userId', getStudysessionsOfStudent);
router.put('/:studysessionId', updateStudysession);
router.delete('/:studysessionId', deleteStudysession);
router.get('/averageRating/:studysessionId', getAverageRating);

export default router;