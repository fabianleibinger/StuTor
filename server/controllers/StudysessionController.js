import Course from '../models/Course.js';
import Studysession from '../models/Studysession.js';
import User from '../models/User.js';
import UserStudysession from '../models/UserStudysession.js';
import { ObjectId } from 'mongodb';

export const createStudysession = async (req, res) => {
    try {
        // Check if studysession from the same tutor exists for the same course.
        const existingStudysession = await Studysession.findOne({
            course: req.body.course,
            tutoredBy: req.body.tutoredBy,
        });
        if (existingStudysession) {
            res.status(409).send('Object already exists!');
            return;
        }
        // Check if course and tutor exist.
        const courseId = new ObjectId(req.body.course);
        const course = await Course.findById(courseId);
        const userId = new ObjectId(req.body.tutoredBy);
        const user = await User.findById(userId);
        if (!course || !user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Create studysession.
        const newStudysession = new Studysession({
            course: courseId,
            tutoredBy: userId,
            description: req.body.description,
            pricePerHourEuro: req.body.pricePerHourEuro,
            languages: req.body.languages,
        });
        try {
            const savedStudysession = await newStudysession.save();
            res.status(201).send(savedStudysession);
        } catch (err) {
            res.status(500).send('Failed to create studysession!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getStudysessions = async (req, res) => {
    try {
        const studysessions = await Studysession.find();
        if (!studysessions) {
            res.status(404).send('No studysessions found!');
        } else {
            res.status(200).send(studysessions);
        }
    } catch (err) {
        res.status(500).send('Failed to retrieve studysessions!');
    }
};

export const getStudysession = async (req, res) => {
    try {
        const studysessionId = new ObjectId(req.params.studysessionId);
        const studysession = await Studysession.findById(studysessionId)
        .populate('course')
        .populate({
            path: 'course',
            populate: {
              path: 'university'
            }
          })
        .populate('tutoredBy');
        console.log("studysession", studysession)
        try {
            if (!studysession) {
                res.status(404).send('Studysession not found!');
            } else {
                res.status(200).send(studysession);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve studysession!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getStudysessionsForCourse = async (req, res) => {
    try {
        // Check if course exists.
        const courseId = new ObjectId(req.params.courseId);
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const studysessions = await Studysession.find({ course: courseId });
        try {
            if (studysessions.length === 0) {
                res.status(404).send('No studysessions found!');
            } else {
                res.status(200).send(studysessions);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve studysessions!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};
        
export const getStudysessionsTutoredBy = async (req, res) => {
    try {
        // Check if user exists.
        const userId = new ObjectId(req.params.userId);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const studysessions = await Studysession.find({ tutoredBy: userId });
        try {
            if (studysessions.length === 0) {
                res.status(404).send('No studysessions found!');
            } else {
                res.status(200).send(studysessions);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve studysessions!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getStudysessionsOfStudent = async (req, res) => {
    try {
        // Check if userStudysession exists.
        const userId = new ObjectId(req.params.userId);
        const userStudysessions = await UserStudysession.find({ student: userId });
        if (userStudysessions.length === 0) {
            res.status(404).send('Object reference not found!');
            return;
        }
        const studysessions = [];
        for (const userStudysession of userStudysessions) {
            const studysession = await Studysession.findById(userStudysession.studysession);
            studysessions.push(studysession);
        }
        try {
            if (studysessions.length === 0) {
                res.status(404).send('No studysessions found!');
            } else {
                res.status(200).send(studysessions);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve studysessions!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const updateStudysession = async (req, res) => {
    try {
        // Check if course and tutor exist.
        const courseId = new ObjectId(req.body.course);
        const course = await Course.findById(courseId);
        const userId = new ObjectId(req.body.tutoredBy);
        const user = await User.findById(userId);
        if (!course || !user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Update studysession.
        const studysessionId = new ObjectId(req.params.studysessionId);
        const updatedStudysession = new Studysession({
            course: courseId,
            tutoredBy: userId,
            description: req.body.description,
            pricePerHourEuro: req.body.pricePerHourEuro,
            languages: req.body.languages,
        });
        try {
            const studysession = await Studysession.findByIdAndUpdate(studysessionId, 
                {
                    name: updatedStudysession.name,
                    tutoredBy: updatedStudysession.tutoredBy,
                    description: updatedStudysession.description,
                    pricePerHourEuro: updatedStudysession.pricePerHourEuro,
                    languages: updatedStudysession.languages,
                });
            if (!studysession) {
                res.status(404).send('Studysession not found!');
            } else {
                res.status(200).send(updatedStudysession);
            }
        } catch (err) {
            res.status(500).send('Failed to update studysession!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const deleteStudysession = async (req, res) => {
    try {
        const studysessionId = new ObjectId(req.params.studysessionId);
        try {
            const studysession = await Studysession.findByIdAndDelete(studysessionId);
            // Delete all student associations of this studysession.
            await UserStudysession.deleteMany({ studysession: studysessionId });
            if (!studysession) {
                res.status(404).send('Studysession not found!');
            } else {
                res.status(200).send('Studysession deleted!');
            }
        } catch (err) {
            res.status(500).send('Failed to delete studysession!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};