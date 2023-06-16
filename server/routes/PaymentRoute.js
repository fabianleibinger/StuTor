import express from 'express';
import { onboardUser, onboardUserRefresh } from '../controllers/PaymentController.js';

const router = express.Router();

router.post("/onboardUser", onboardUser);
router.get("/onboardUserRefresh", onboardUserRefresh);

export default router;