import express from 'express';
import { createAccount, getAccount, createPayment, deleteAccount } from '../controllers/PaymentController.js';

const router = express.Router();

//router.post("/onboardUser", onboardUser);
//router.get("/onboardUserRefresh", onboardUserRefresh);
router.post("/createAccount/:userId", createAccount)
router.get("/account/:userId", getAccount)
router.post("/createPayment", createPayment)
router.delete("/deleteAccount", deleteAccount)

export default router;