import express from "express";
import {
  register,
  login,
  logout,
  checkPassword,
  forgotPassword,
  verifyToken,
} from "../controllers/AuthenticationController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/checkPassword", checkPassword);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyToken", verifyToken);

export default router;
