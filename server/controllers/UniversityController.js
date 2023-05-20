import University from '../models/University.js';
import { ObjectId } from 'mongodb';

export const createUniversity = async (req, res) => {
    try {
        const newUniversity = new University({
            name: req.body.name,
            country: req.body.country,
        });
        try {
            const savedUniversity = await newUniversity.save();
            res.status(201).send(savedUniversity);
        } catch (err) {
            res.status(500).send('Failed to create object!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getUniversity = async (req, res) => {
    try {
        const universityId = new ObjectId(req.params.universityId);
        const unversity = await University.findById(universityId);
        try {
            if (!unversity) {
                res.status(404).send('University not found!');
            } else {
                res.status(200).send(unversity);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve university!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        if (universities.length === 0) {
            res.status(404).send('No universities found!');
        } else {
            res.status(200).send(universities);
        }
    } catch (err) {
        res.status(500).send('Failed to retrieve universities!');
    }
};

export const updateUniversity = async (req, res) => {
    try {
        const universityId = new ObjectId(req.params.universityId);
        const updatedUniversity = new University({
            name: req.body.name,
            country: req.body.country,
        });
        try {
            const university = await University.findByIdAndUpdate(universityId,
                {
                    name: updatedUniversity.name,
                    country: updatedUniversity.country,
                });
            if (!university) {
                res.status(404).send('University not found!');
            } else {
                res.status(200).send(updatedUniversity);
            }
        } catch (err) {
            res.status(500).send('Failed to update university!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const deleteUniversity = async (req, res) => {
    try {
        const universityId = new ObjectId(req.params.universityId);
        try {
            const university = await University.findByIdAndDelete(universityId)
            if (!university) {
                res.status(404).send('University not found!');
            } else {
                res.status(200).send('University deleted.');
            }
        } catch (err) {
            res.status(500).send('Failed to delete university!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};
