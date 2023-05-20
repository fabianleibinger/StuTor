import Course from '../models/Course.js';
import University from '../models/University.js';
import { ObjectId } from 'mongodb';

export const createCourse = async (req, res) => {
    const course = await Course.find({ id: req.body.id })
    if (course && course.length !== 0) {
        console.log('Fisrt catch')
        res.status(400).send('Course already exists!');
        return;
    }
    const universityId = new ObjectId(req.body.universityId);
    University.findById(universityId)
    .then(university => {
        const newCourse = new Course({
            name: req.body.name,
            id: req.body.id,
            description: req.body.description,
            university: university.id,
            department: req.body.department,
            professor: req.body.professor,
        });
        newCourse.save(newCourse)
            .then(course => {
                console.log('Send ok')
                res.status(201).send(course);
                return;
            })
            .catch(err => {
                console.log('Send 500')
                console.error(err);
                res.status(500).send('Failed to create object!');
                return;
            });
})
        .catch(err => {
            console.log('Send 400')
            res.status(400).send('Bad request!');
            return;
        });
};

export const getCourse = async (req, res) => {
    var courseId;
    try {
        courseId = new ObjectId(req.params.courseId);
        Course.findById(courseId)
            .then(course => {
                if (!course) {
                    res.status(404).send('Course not found!');
                } else {
                    res.status(200).send(course);
                }
            }).catch(err => {
                res.status(500).send('Failed to retrieve course!');
            });
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getCourses = async (req, res) => {
    Course.find()
        .then(courses => {
            if (courses.length === 0) {
                res.status(404).send('No courses found!');
            } else {
                res.status(200).send(courses);
            }
        }).catch(err => {
            res.status(500).send('Internal server error!');
        });
};

export const updateCourse = async (req, res) => {
    var courseId;
    var updatedCourse;
    try {
        courseId = new ObjectId(req.params.courseId);
        updatedCourse = new Course({
            name: req.body.name,
            id: req.body.id,
            description: req.body.description,
            university: req.body.universityId,
            department: req.body.department,
            professor: req.body.professor,
        });
        Course.findByIdAndUpdate(courseId,
            {
                name: updatedCourse.name,
                id: updatedCourse.id,
                description: updatedCourse.description,
                university: updatedCourse.university,
                department: updatedCourse.department,
                professor: updatedCourse.professor,
            })
            .then(course => {
                if (!course) {
                    res.status(404).send('Course not found!');
                } else {
                    res.status(200).send(updatedCourse);
                }
            }).catch(err => {
                res.status(500).send('Failed to update course!');
            });
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const deleteCourse = async (req, res) => {
    var courseId;
    try {
        courseId = new ObjectId(req.params.courseId);
        Course.findByIdAndDelete(courseId)
            .then(course => {
                if (!course) {
                    res.status(404).send('Course not found!');
                } else {
                    res.status(200).send('Course deleted.');
                }
            }).catch(err => {
                res.status(500).send('Failed to delete course!');
            });
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};
