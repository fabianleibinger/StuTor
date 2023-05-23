import Studysession from "../models/Studysession.js";
import User from "../models/User.js";
import UserStudysession from "../models/UserStudysession.js";
import { ObjectId } from "mongodb";

export const createUserStudysession = async (req, res) => {
    try {
        // Check if userStudysession exists already.
        const existingUserStudysession = await UserStudysession.findOne({
            studysession: req.body.studysession,
            student: req.body.student,
        });
        if (existingUserStudysession) {
            res.status(409).send("UserStudysession already exists!");
            return;
        }
        // Check if studysession and user exist.
        const studysessionId = new ObjectId(req.body.studysession);
        const studysession = await Studysession.findById(studysessionId);
        const userId = new ObjectId(req.body.student);
        const user = await User.findById(userId);
        if (!studysession || !user) {
            res.status(404).send("Object reference not found!");
            return;
        }
        // Create userStudysession.
        const newUserStudysession = new UserStudysession({
            studysession: studysessionId,
            student: userId,
        });
        try {
            const savedUserStudysession = await newUserStudysession.save();
            res.status(201).send(savedUserStudysession);
        } catch (err) {
            res.status(500).send("Failed to create userStudysession!");
        }
    } catch (err) {
        res.status(400).send("Bad request!");
    }
};

export const getUserStudysession = async (req, res) => {
    try {
        const userStudysessionId = new ObjectId(req.params.userStudysessionId);
        const userStudysession = await UserStudysession.findById(userStudysessionId);
        try {
            if (!userStudysession) {
                res.status(404).send("UserStudysession not found!");
            } else {
                res.status(200).send(userStudysession);
            }
        } catch (err) {
            res.status(500).send("Failed to retrieve userStudysession!");
        }
    } catch (err) {
        res.status(400).send("Bad request!");
    }
};

export const deleteUserStudysession = async (req, res) => {
    try {
        const userStudysessionId = new ObjectId(req.params.userStudysessionId);
        try {
            const userStudysession = await UserStudysession.findByIdAndDelete(userStudysessionId);
            if (!userStudysession) {
                res.status(404).send("UserStudysession not found!");
            } else {
                res.status(200).send('UserStudysession deleted!');
            }
        } catch (err) {
            res.status(500).send("Failed to delete userStudysession!");
        }
    } catch (err) {
        res.status(400).send("Bad request!");
    }
};