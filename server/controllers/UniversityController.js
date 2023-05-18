import University from '../models/University.js';
import { ObjectId } from 'mongodb';

export const createUniversity = async (req, res) => {
    try {
        const newUniversity = new University({
            name: req.body.name,
            country: req.body.country,
        });
        newUniversity.save(newUniversity)
            .then(university => {
                res.status(201).send(university);
            }).catch(err => {
                res.status(500).send('Failed to create object!');
            });
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getUniversity = async (req, res) => {
    var universityId;
    try {
        universityId = new ObjectId(req.params.universityId);
        University.findById(universityId)
            .then(university => {
                if (!university) {
                    res.status(404).send('University not found!');
                } else {
                    res.status(200).send(university);
                }
            }).catch(err => {
                res.status(500).send('Failed to retrieve university!');
            });
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getUniversities = async (req, res) => {
    University.find()
        .then(universities => {
            if (universities.length === 0) {
                res.status(404).send('No universities found!');
            } else {
                res.status(200).send(universities);
            }
        }).catch(err => {
            res.status(500).send('Internal server error!');
        });
};

export const updateUniversity = async (req, res) => {
    var universityId;
    var updatedUniversity;
    try {
        universityId = new ObjectId(req.params.universityId);
        updatedUniversity = new University({
            name: req.body.name,
            country: req.body.country,
        });
        University.findByIdAndUpdate(universityId,
            {
                name: updatedUniversity.name,
                country: updatedUniversity.country,
            })
            .then(university => {
                if (!university) {
                    res.status(404).send('University not found!');
                } else {
                    res.status(200).send(updatedUniversity);
                }
            }).catch(err => {
                res.status(500).send('Failed to update university!');
            });
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const deleteUniversity = async (req, res) => {
    var universityId;
    try {
        universityId = new ObjectId(req.params.universityId);
        University.findByIdAndDelete(universityId)
            .then(university => {
                if (!university) {
                    res.status(404).send('University not found!');
                } else {
                    res.status(200).send('University deleted.');
                }
            }).catch(err => {
                res.status(500).send('Failed to delete university!');
            });
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};
