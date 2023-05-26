import Achievement from '../models/Achievement.js';
import User from '../models/User.js';
import UserAchievement from '../models/UserAchievement.js';
import { ObjectId } from 'mongodb';

export const createUserAchievement = async (req, res) => {
    try {
        // Check if userAchievement exists already.
        const existingUserAchievement = await UserAchievement.findOne({
            achievement: req.body.achievement,
            user: req.body.user,
        });
        if (existingUserAchievement) {
            res.status(409).send('UserAchievement already exists!');
            return;
        }
        // Check if achievement and user exist.
        const achievementId = new ObjectId(req.body.achievement);
        const achievement = await Achievement.findById(achievementId);
        const userId = new ObjectId(req.body.user);
        const user = await User.findById(userId);
        if (!achievement || !user) {
            res.status(404).send('Object reference not found!');
            return;
        }
        // Create userAchievement.
        const newUserAchievement = new UserAchievement({
            achievement: achievementId,
            user: userId,
        });
        try {
            const savedUserAchievement = await newUserAchievement.save();
            res.status(201).send(savedUserAchievement);
        } catch (err) {
            res.status(500).send('Failed to create userAchievement!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

export const getUserAchievement = async (req, res) => {
    try {
        const userAchievementId = new ObjectId(req.params.userAchievementId);
        const userAchievement = await UserAchievement.findById(userAchievementId);
        try {
            if (!userAchievement) {
                res.status(404).send('UserAchievement not found!');
            } else {
                res.status(200).send(userAchievement);
            }
        } catch (err) {
            res.status(500).send('Failed to retrieve userAchievement!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};

//TODO: Delete all UserAchievements relevant.
export const deleteUserAchievement = async (req, res) => {
    try {
        const userAchievementId = new ObjectId(req.params.userAchievementId);
        try {
            const userAchievement = await UserAchievement.findByIdAndDelete(userAchievementId);
            if (!userAchievement) {
                res.status(404).send('UserAchievement not found!');
            } else {
                res.status(200).send('UserAchievement deleted!');
            }
        } catch (err) {
            res.status(500).send('Failed to delete userAchievement!');
        }
    } catch (err) {
        res.status(400).send('Bad request!');
    }
};