import express from 'express';
import { onboardUser, onboardUserRefresh, createAccount, getAccount, createPayment, deleteAccount } from '../controllers/PaymentController.js';

const router = express.Router();

router.post("/onboardUser", onboardUser);
router.get("/onboardUserRefresh", onboardUserRefresh);
router.post("/account", createAccount)
router.get("/account/:userId", getAccount)
router.post("/createPayment", createPayment)
router.post("/deleteAccount", deleteAccount)

export default router;