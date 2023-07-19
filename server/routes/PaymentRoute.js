import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {
  createAccount,
  getAccount,
  createPayment,
  deleteAccount,
  updateAccount,
} from "../controllers/PaymentController.js";

const router = express.Router();

//router.post("/onboardUser", onboardUser);
//router.get("/onboardUserRefresh", onboardUserRefresh);
router.post("/createAccount/:userId", createAccount);
router.get("/account/:userId", getAccount);
router.post("/createPayment", createPayment);
router.delete("/deleteAccount/:userId", verifyToken, deleteAccount);
router.put("/updateAccount/:userId", updateAccount);

export default router;
