import University from "../models/University.js";
import createError from "../utils/createError.js";
import { ObjectId } from "mongodb";

export const createUniversity = async (req, res, next) => {
    try {
        const newUniversity = new University({
            name: req.body.name,
            country: req.body.country,
        });

        const savedUniversity = await newUniversity.save();
        res.status(201).send(savedUniversity);
    } catch (err) {
        next(err);
    }
};

export const getUniversity = async (req, res, next) => {
    try {
        const university = await University.find({ _id: new ObjectId(req.params.universityId) });
        res.status(200).send(university);
    } catch (err) {
        next(err);
    }
};
export const deleteUniversity = async (req, res, next) => {
    try {
        const university = await University.find({ _id: new ObjectId(req.params.universityId) });
        if (university.length === 0) {
            return next(createError(404, "University not found!"));
        }
        await University.findByIdAndDelete({ _id: new ObjectId(req.params.universityId) });
        res.status(200).send("deleted.");
    } catch (err) {
        next(err);
    }
};
// TO DO: Implement this
export const updateUniversity = async (req, res, next) => {
    try {
        const university = await University.find({ _id: new ObjectId(req.params.universityId) });
        if (university.length === 0) {
            return next(createError(404, "University not found!"));
        }
        const updatedUniversity = await University.findByIdAndUpdate(
            req.params.universityId,
            req.body,
            { name: req.body.name,
                country: req.body.country}
        );
        res.status(200).send(updatedUniversity);
    } catch (err) {
        next(err);
    }
};