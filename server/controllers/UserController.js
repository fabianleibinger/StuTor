import University from '../models/University.js';
import User from '../models/User.js';
import { ObjectId } from 'mongodb';

export const createUser = async (req, res) => {
  try {
    // Check if user exists already.
    const existingUser = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email },
      ],
    });
    if (existingUser) {
      res.status(409).send('Object already exists!');
      return;
    }
    // Check if university exists.
    const universityId = new ObjectId(req.body.university);
    const university = await University.findById(universityId);
    if (!university) {
      res.status(404).send('Object reference not found!');
      return;
    }
    // Create user.
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      picture: req.body.picture,
      role: req.body.role,
      university: universityId,
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send('Failed to create user!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    const user = await User.findById(userId);
    try {
      if (!user) {
        res.status(404).send('User not found!');
      } else {
        res.status(200).send(user);
      }
    } catch (err) {
      res.status(500).send('Failed to retrieve user!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const getUsersOfUniversity = async (req, res) => {
  try {
    // Check if university exists.
    const universityId = new ObjectId(req.params.universityId);
    const university = await University.findById(universityId);
    if (!university) {
      res.status(404).send('Object reference not found!');
      return;
    }
    const users = await User.find({ university: universityId });
    try {
      if (users.length === 0) {
        res.status(404).send('Users not found!');
      } else {
        res.status(200).send(users);
      }
    } catch (err) {
      res.status(500).send('Failed to retrieve users!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

// TODO: Implement getUsersThatAchieved().
// TODO: Implement getStudentsOfStudysession().

export const updateUser = async (req, res) => {
  try {
    // Check if university exists.
    const universityId = new ObjectId(req.body.university);
    const university = await University.findById(universityId);
    if (!university) {
      res.status(404).send('Object reference not found!');
      return;
    }
    // Update user.
    const userId = new ObjectId(req.params.userId);
    const updatedUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      picture: req.body.picture,
      role: req.body.role,
      university: universityId,
    });
    try {
      const user = await User.findByIdAndUpdate(userId, 
        {
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          lastname: updatedUser.lastname,
          firstname: updatedUser.firstname,
          picture: updatedUser.picture,
          role: updatedUser.role,
          university: updatedUser.university,
        });
      if (!user) {
        res.status(404).send('User not found!');
      } else {
        res.status(200).send(updatedUser);
      }
    } catch (err) {
      res.status(500).send('Failed to update user!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        res.status(404).send('User not found!');
      } else {
        res.status(200).send('User deleted!');
      }
    } catch (err) {
      res.status(500).send('Failed to delete user!');
    }
  } catch (err) {
    res.status(400).send('Bad request!');
  }
};