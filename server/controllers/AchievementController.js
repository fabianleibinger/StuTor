import Achievement from "../models/Achievement.js";
import UserAchievement from "../models/UserAchievement.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb";

export const createAchievement = async (req, res) => {
  try {
    // Check if achievement exists already.
    const existingAchievement = await Achievement.findOne({
      name: req.body.name,
    });
    if (existingAchievement) {
      res.status(409).send("Achievement already exists!");
      return;
    }
    // Create achievement.
    const newAchievement = new Achievement({
      name: req.body.name,
      description: req.body.description,
      badge: req.body.badge,
    });
    try {
      const savedAchievement = await newAchievement.save();
      res.status(201).send(savedAchievement);
    } catch (err) {
      res.status(500).send("Failed to create achievement!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    if (achievements.length === 0) {
      res.status(404).send("No achievements found!");
    } else {
      res.status(200).send(achievements);
    }
  } catch (err) {
    res.status(500).send("Failed to retrieve achievements!");
  }
};

export const getAchievement = async (req, res) => {
  try {
    const achievementId = new ObjectId(req.params.achievementId);
    const achievement = await Achievement.findById(achievementId);
    try {
      if (!achievement) {
        res.status(404).send("Achievement not found!");
      } else {
        res.status(200).send(achievement);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve achievement!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const getUserAchievementsOfUser = async (req, res) => {
  try {
    // Check if user exists.
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found!");
      return;
    }
    try {
      const userAchievements = await UserAchievement.find({
        user: userId,
      }).populate("achievement");
      if (userAchievements.length === 0) {
        res.status(200).send([]);
      } else {
        res.status(200).send(userAchievements);
      }
    } catch (err) {
      res.status(500).send("Failed to retrieve achievements!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const achievementId = new ObjectId(req.params.achievementId);
    const updatedAchievement = new Achievement({
      name: req.body.name,
      description: req.body.description,
      badge: req.body.badge,
    });
    try {
      const achievement = await Achievement.findByIdAndUpdate(achievementId, {
        name: updatedAchievement.name,
        description: updatedAchievement.description,
        badge: updatedAchievement.badge,
      });
      if (!achievement) {
        res.status(404).send("Achievement not found!");
      } else {
        res.status(200).send(updatedAchievement);
      }
    } catch (err) {
      res.status(500).send("Failed to update achievement!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const achievementId = new ObjectId(req.params.achievementId);
    try {
      const achievement = await Achievement.findByIdAndDelete(achievementId);
      // Delete all user associations of this achievement.
      await UserAchievement.deleteMany({ achievement: achievementId });
      if (!achievement) {
        res.status(404).send("Achievement not found!");
      } else {
        res.status(200).send("Achievement deleted!");
      }
    } catch (err) {
      res.status(500).send("Failed to delete achievement!");
    }
  } catch (err) {
    res.status(400).send("Bad request!");
  }
};
