import Course from '../models/Course.js';
import University from '../models/University.js';
import { ObjectId } from 'mongodb';

export const createCourse = async (req, res) => {
  try {
    // Check if university exists.
    const universityId = new ObjectId(req.body.university);
    const university = await University.findById(universityId);
    if (!university) {
      res.status(404).send('Object reference not found!');
      return;
    }
    // Create course.
    const newCourse = new Course({
      name: req.body.name,
      external_identifier: req.body.external_identifier,
      description: req.body.description,
      university: universityId,
      department: req.body.department,
      professor: req.body.professor
    });
    try {
      const savedCourse = await newCourse.save();
      res.status(201).send(savedCourse);
    } catch (err) {
      res.status(500).send('Failed to create course!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses.length === 0) {
      res.status(404).send('No courses found!');
    } else {
      res.status(200).send(courses);
    }
  } catch (err) {
    res.status(500).send('Failed to retrieve courses!');
  }
};

export const getCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.courseId);
    const course = await Course.findById(courseId);
    try {
      if (!course) {
        res.status(404).send('Course not found!');
      } else {
        res.status(200).send(course);
      }
    } catch (err) {
      res.status(500).send('Failed to retrieve course!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getCoursesOfUniversity = async (req, res) => {
  try {
    // Check if university exists.
    const universityId = new ObjectId(req.params.universityId);
    const university = await University.findById(universityId);
    if (!university) {
      res.status(404).send('Object reference not found!');
      return;
    }
    const courses = await Course.find({ university: universityId });
    try {
      if (courses.length === 0) {
        res.status(404).send('No courses found!');
      } else {
        res.status(200).send(courses);
      }
    } catch (err) {
      res.status(500).send('Failed to retrieve courses!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getCoursesFilteredBySearchString = async (req, res) => {
  try {
    const searchString = req.query.searchTerm;

    const courses = await Course.find({
      $or: [
        { name: { $regex: searchString, $options: 'i' } },
        { external_identifier: { $regex: searchString, $options: 'i' } }
      ]
    });

    if (courses.length === 0) {
      res.status(404).send('No courses found!');
    } else {
      res.status(200).send(courses);
    }
  } catch (err) {
    res.status(500).send('Failed to retrieve courses!');
  }
};

export const updateCourse = async (req, res) => {
  try {
    // Check if university exists.
    const universityId = new ObjectId(req.body.university);
    const university = await University.findById(universityId);
    if (!university) {
      res.status(404).send('Object reference not found!');
      return;
    }
    // Update course.
    const courseId = new ObjectId(req.params.courseId);
    const updatedCourse = new Course({
      name: req.body.name,
      external_identifier: req.body.external_identifier,
      description: req.body.description,
      university: universityId,
      department: req.body.department,
      professor: req.body.professor
    });
    try {
      const course = await Course.findByIdAndUpdate(courseId, {
        name: updatedCourse.name,
        external_identifier: updatedCourse.external_identifier,
        description: updatedCourse.description,
        university: updatedCourse.university,
        department: updatedCourse.department,
        professor: updatedCourse.professor
      });
      if (!course) {
        res.status(404).send('Course not found!');
      } else {
        res.status(200).send(updatedCourse);
      }
    } catch (err) {
      res.status(500).send('Failed to update course!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.courseId);
    try {
      const course = await Course.findByIdAndDelete(courseId);
      if (!course) {
        res.status(404).send('Course not found!');
      } else {
        res.status(200).send('Course deleted.');
      }
    } catch (err) {
      res.status(500).send('Failed to delete course!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};
