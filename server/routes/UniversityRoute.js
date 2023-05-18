import express from 'express';
import {
  createUniversity,
  getUniversity,
  getUniversities,
  deleteUniversity,
  updateUniversity,
} from '../controllers/UniversityController.js';

const router = express.Router();

router.post('/', createUniversity);
router.get('/:universityId', getUniversity);
router.get('/', getUniversities);
router.put('/:universityId', updateUniversity);
router.delete('/:universityId', deleteUniversity);

export default router;