import express from 'express';
import { createAccount, getAccount, createPayment, deleteAccount, updateAccount, createAccountForNewUser } from '../controllers/PaymentController.js';

const router = express.Router();

//router.post("/onboardUser", onboardUser);
//router.get("/onboardUserRefresh", onboardUserRefresh);
router.post("/createAccount/:userId", createAccount)
router.get("/account/:userId", getAccount)
router.post("/createPayment", createPayment)
router.delete("/deleteAccount/:userId", deleteAccount)
router.put('/updateAccount/:userId', updateAccount)
router.post("/createAccountForNewUser", createAccountForNewUser)

export default router;