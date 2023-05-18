import University from "../models/University.js";

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
        const university = await University.find({ reviewId: req.params.id });
        res.status(200).send(university);
    } catch (err) {
        next(err);
    }
};
export const deleteUniversity = async (req, res, next) => {
    try {
        University.findByIdAndDelete(req.params.id);
        res.status(200).send("deleted.");
    } catch (err) {
        next(err);
    }
};

export const updateUniversity = async (req, res, next) => {
    try {
        const university = await University.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).send(university);
    } catch (err) {
        next(err);
    }
};