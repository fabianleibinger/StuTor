import express from 'express';
import { onboardUser, onboardUserRefresh, createAccount } from '../controllers/PaymentController.js';

const router = express.Router();

router.post("/onboardUser", onboardUser);
router.get("/onboardUserRefresh", onboardUserRefresh);
router.post("/account", createAccount)

export default router;