import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRandomPassword } from "../middleware/generatePassword.js";
import { sendEmailToUser } from "../middleware/sendEmailToUser.js";

export const register = async (req, res) => {
  try {
    // Check of Duplicate username
    if (await User.findOne({ username: req.body.username })) {
      res.status(409).send("Username is already taken");
      return;
    }
    // Check of Duplicate email
    if (await User.findOne({ email: req.body.email })) {
      res.status(409).send("Email is already taken");
      return;
    }

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    res.status(500).send("Failed to register user.");
  }
};

export const login = async (req, res) => {
  try {
    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });

    if (!user) {
      res.status(404).send("User not found!");
      return;
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      res.status(400).send("Wrong password or username!");
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    res.status(500).send("Failed to login user.");
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const checkPassword = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(404).send(false);
      return;
    }
    const isTokenCorrect = bcrypt.compareSync(
      req.body.oldPassword,
      user.resetToken
    );
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );
    if (!isPasswordCorrect && !isTokenCorrect) {
      res.status(200).send(false);
      return;
    }
    res.status(200).send(true);
    return;
  } catch (err) {
    res.status(500).send(false);
    return;
  }
};

export const forgotPassword = async (req, res) => {
  try {
    // Find the user by email
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      res.status(404).send("User not found!");
      return;
    }

    // Generate a random token for password reset
    const resetToken = await generateRandomPassword();

    // Update user.resetToken to hash of newPass
    const resetTokenHash = bcrypt.hashSync(resetToken, 5);

    const updatedUser = { ...existingUser._doc, resetToken: resetTokenHash };
    await User.findByIdAndUpdate(existingUser._id, updatedUser, {
      new: true,
    });

    // Send an email to the user with the resetToken
    sendEmailToUser(
      req.body.email,
      "STUTOR Account Password Reset",
      resetToken
    );

    res.status(200).send("Temporary token sent to your email.");
  } catch (err) {
    res.status(500).send("Failed to initiate password reset.");
  }
};

export const verifyToken = async (req, res) => {
  try {
    // Find the user by or email
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(404).send("User not found!");
      return;
    }

    const isCorrect = bcrypt.compareSync(req.body.resetToken, user.resetToken);
    if (!isCorrect) {
      res.status(400).send("Wrong Password Reset Token!");
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    res.status(500).send("Failed to verify password reset token.");
  }
};
