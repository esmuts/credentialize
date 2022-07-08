import { User } from "../models/users.model.js";

import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

// Create object to hold all the user controller methods.
const users = {};

// Login user and return JWT token.
users.login = async (req, res) => {
  // Saves username and password from request body.
  const usr = req.body.username;
  const pwd = req.body.password;
  // Finds the username in the database.
  try {
    const user = await User.findOne({ username: usr });
    // Sends error message if username cannot be found in the database.
    if (user === null) {
      res.status(403).send({ msg: "That's not a valid username." });
    } else if (!(pwd === user.password)) {
      // Sends error message if entered password does not match record.
      res.status(403).send({ msg: "That password doesn't match." });
      // Responds with a JWT if password matches record.
    } else {
      const payload = {
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      };
      let token = sign(JSON.stringify(payload), "jwt-secret", {
        algorithm: "HS256",
      });
      // Responds with user's display name and JWT token.
      res.send({ token: token });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

// Verifies the user's JWT token.
users.verify = async (req, res) => {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    const decoded = verify(token, "jwt-secret");
    res.send({
      decoded,
    });
  } catch (err) {
    res.status(401).send({
      msg: "Your credentials could not be validated. Please log in again.",
    });
  }
};

// Add new user to the database.
users.create = async (req, res) => {
  // Create a new instance of User model, store user details in it.
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    permissions: req.body.permissions,
  });
  try {
    // Save the new user to the database
    await user.save();
    res.send({ msg: "User added successfully." });
  } catch (err) {
    // Sends error message is user could not be added.
    res.status(500).send({ msg: err.message });
  }
};

// Find all users
users.findAll = async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

// Find a specific user by ID.
users.findById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.send({ msg: err.message });
  }
};

// Find and update a user by ID.
users.update = async (req, res) => {
  // Gets id value from parameter
  const id = req.params.id;
  try {
    // Finds and updates the record matching the request id.
    const result = await User.findOneAndUpdate(
      { _id: id },
      {
        permissions: req.body.permissions,
        role: req.body.role,
      },
      { new: true }
    );
    res.send({ msg: "User permissions updated successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

export default users;
