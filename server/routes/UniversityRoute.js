import express from 'express';
import {
  createUniversity,
  getUniversities,
  getUniversity,
  deleteUniversity,
  updateUniversity,
} from '../controllers/UniversityController.js';

const router = express.Router();

router.post('/', createUniversity);
router.get('/', getUniversities);
router.get('/:universityId', getUniversity);
router.put('/:universityId', updateUniversity);
router.delete('/:universityId', deleteUniversity);

export default router;