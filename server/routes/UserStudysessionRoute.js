import express from "express";
import {
  createUserStudysession,
  getUserStudysession,
  deleteUserStudysession,
} from "../controllers/UserStudysessionController.js";

const router = express.Router();

router.post("/", createUserStudysession);
router.get("/id/:userStudysessionId", getUserStudysession);
router.delete("/:userStudysessionId", deleteUserStudysession);

export default router;
