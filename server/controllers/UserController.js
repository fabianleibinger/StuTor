import Studysession from '../models/Studysession.js';
import University from '../models/University.js';
import User from '../models/User.js';
import UserAchievement from '../models/UserAchievement.js';
import UserStudysession from '../models/UserStudysession.js';
import { ObjectId } from 'mongodb';

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
        res.status(404).send('No users found!');
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

export const getUsersThatAchieved = async (req, res) => {
  try {
    // Check if achievement exists.
    const achievementId = new ObjectId(req.params.achievementId);
    const userAchievements = await UserAchievement.find({ achievement: achievementId });
    if (userAchievements.length === 0) {
      res.status(404).send('Object reference not found!');
      return;
    }
    const users = [];
    for (const userAchievement of userAchievements) {
      const user = await User.findById(userAchievement.user);
      users.push(user);
    }
    try {
      if (users.length === 0) {
        res.status(404).send('No users found!');
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

export const getUsersOfStudysession = async (req, res) => {
  try {
    // Check if userStudysession exists.
    const studysessionId = new ObjectId(req.params.studysessionId);
    const userStudysessions = await UserStudysession.find({ studysession: studysessionId });
    if (userStudysessions.length === 0) {
      res.status(404).send('Object reference not found!');
      return;
    }
    const users = [];
    for (const userStudysession of userStudysessions) {
      const student = await User.findById(userStudysession.student);
      users.push(student);
    }
    try {
      if (users.length === 0) {
        res.status(404).send('No users found!');
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
      ...req.body,
      university: universityId,
    });
    try {
      const user = await User.findByIdAndUpdate(userId, 
        {
          ...updatedUser.body,
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
    if (req.userId !== userId.toString()) {
      res.status(403).send("You can delete only your account!");  
      return
    }
    try {
      const user = await User.findByIdAndDelete(userId);
      // Delete all achievement and studysession associations (student and tutor) of this user.
      await UserAchievement.deleteMany({ user: userId });
      await UserStudysession.deleteMany({ student: userId });
      await Studysession.deleteMany({ tutor: userId });
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