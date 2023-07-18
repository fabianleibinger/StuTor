import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  console.log("----------- VERIFYING TOKEN -----------");

  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).send("You are not authenticated!");
    return;
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    console.log("req: ", req);
    console.log("payload: ", payload);

    if (err) {
      res.status(403).send("Token is not valid!");
      return;
    }
    // res.status(200).send("Token is valid!");
    req.userId = payload.id;
    next();
  });
};

export const authenticate = async (req, res) => {
  try {
    // Check if the access token exists in the request cookies
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(401).send("Access token not found");
      return;
    }

    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY);

    // Retrieve the user based on the decoded information
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).send("Invalid access token");
      return;
    }

    // Attach the user object to the request for future use
    req.user = user;
  } catch (err) {
    res.status(500).send("Failed during authentication.");
  }
};
