import express from "express";
import {
  register,
  login,
  logout,
  checkPassword,
} from "../controllers/AuthenticationController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/checkPassword", checkPassword);

export default router;
