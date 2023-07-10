import Chat from '../models/Chat.js';
import Course from '../models/Course.js';
import Review from '../models/Review.js';
import Studysession from '../models/Studysession.js';
import User from '../models/User.js';
import UserStudysession from '../models/UserStudysession.js';
import { ObjectId, ReturnDocument } from 'mongodb';

export const createStudysession = async (req, res) => {
  try {
    // Check if studysession from the same tutor exists for the same course.
    console.log(req.body);
    const existingStudysession = await Studysession.findOne({
      course: req.body.course,
      tutoredBy: req.body.tutoredBy
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
      if (!course) {
        console.log('Course not found');
      } else {
        console.log('User not found');
      }
      res.status(404).send('Object reference not found!');
      return;
    }
    // Create studysession.
    const newStudysession = new Studysession({
      course: courseId,
      tutoredBy: userId,
      description: req.body.description,
      pricePerHourEuro: req.body.pricePerHourEuro,
      languages: req.body.languages
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
    const studysession = await Studysession.findById(studysessionId);
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
    const studysessions = await Studysession.find({
      tutoredBy: userId
    })
      .populate('course')
      .populate('tutoredBy');
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
      const studysession = await Studysession.findById(
        userStudysession.studysession
      );
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

export const getStudysessionsFiltered = async (req, res) => {
  try {
    const searchString = req.query.searchTerm;
    const maxPrice = req.query.maxPrice;
    const languages = req.query.languages;
    const languageArray = languages.split(',');
    const department = req.query.department;

    let query = Studysession.find()
      .populate('course')
      .populate('tutoredBy');

    if (maxPrice !== '') {
      query = query.where('pricePerHourEuro').lte(maxPrice);
    }
    if (languages.length > 0) {
      query = query.where('languages').in(languageArray);
    }

    const studysessions = await query.exec();
    const filteredSessions = studysessions.filter(
      session =>
        (session.course.name
          .toLowerCase()
          .includes(searchString.toLowerCase()) ||
          session.course.external_identifier
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          session.tutoredBy.firstname
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          session.tutoredBy.lastname
            .toLowerCase()
            .includes(searchString.toLowerCase())) &&
        (session.course.department === department || department === '')
    );

    if (filteredSessions.length === 0) {
      res.status(404).send('No StudySession found!');
    } else {
      res.status(200).send(filteredSessions);
    }
  } catch (err) {
    res.status(500).send('Failed to retrieve Studysession!');
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
      languages: req.body.languages
    });

    try {
      const studysession = await Studysession.findByIdAndUpdate(
        studysessionId,
        {
          course: updateStudysession.course,
          name: updatedStudysession.name,
          tutoredBy: updatedStudysession.tutoredBy._id,
          description: updatedStudysession.description,
          pricePerHourEuro: updatedStudysession.pricePerHourEuro,
          languages: updatedStudysession.languages
        }
      );
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

export const getAverageRating = async (req, res) => {
  try {
    const studysessionId = new ObjectId(req.params.studysessionId);
    console.log('studysessionId', studysessionId);

    let reviews = await Review.find().populate({
      path: 'booking',
      match: { studysession: studysessionId },
      populate: {
        path: 'studysession',
        model: 'Studysession'
      }
    });

    reviews = reviews.filter(review => review.booking !== null);
    if (reviews.length === 0) {
      res.status(404).send('No ratings found!');
    } else {
      const averageRating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      res.status(200).send(averageRating.toString());
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Bad request!');
  }
};

export const getReviewsOfStudysession = async (req, res) => {
  try {
    // Check if studysession exists.
    const studysessionId = new ObjectId(req.params.studysessionId);
    const studysession = await Studysession.findById(studysessionId);
    if (!studysession) {
      res.status(404).send('Object reference not found!');
      return;
    }
    try {
      const reviews = await Review.find().populate({
        path: 'booking',
        match: { studysession: studysessionId },
        populate: {
          path: 'studysession',
          model: 'Studysession'
        }
      });
      const filteredReviews = reviews.filter(review => review.booking !== null);
      res.status(200).send(filteredReviews);
    } catch (err) {
      console.log(err);
      res.status(500).send('Failed to retrieve reviews!');
      return;
    }
  } catch (err) {
    console.log('err', err);
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
      // Delete chats of this studysession.
      await Chat.deleteMany({ studysession: studysessionId });
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
