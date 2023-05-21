import express from 'express';
import { createStudysession, getStudysessions, getStudysession, updateStudysession, deleteStudysession } from '../controllers/StudysessionController.js';

const router = express.Router();

router.post('/', createStudysession);
router.get('/', getStudysessions);
router.get('/:studysessionId', getStudysession);
router.put('/:studysessionId', updateStudysession);
router.delete('/:studysessionId', deleteStudysession);

export default router;