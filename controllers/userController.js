const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @Register  POST
// http://localhost:5000/api/v1/register
// public
const registerUser = async (req, res) => {
  // check we have details from frontend
  const { username, phone, password, profile } = req.body;

  const requiredFields = ["username", "phone", "password", "profile"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).send(`Missing required field: ${field}`);
      return;
    }
  }

  // check if the user already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400).json({ message: "User already exists in database" });
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    username,
    phone,
    profile,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      phone: user.phone,
      profile: user.profile,
      isPaid: user.isPaid,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// @login  POST
// http://localhost:5000/api/v1/login
// public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const requiredFields = ["username", "password"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).send(`Missing required field: ${field}`);
      return;
    }
  }

  // check if user exists
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      phone: user.phone,
      profile: user.profile,
      isPaid: user.isPaid,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
};

// fetch all users
const allUsers = async (req, res) => {
  const users = await User.find().sort({ $natural: -1 });
  if (users) {
    res.status(200).send(users);
    return;
  }
};

//fetch specific user based on username
const getUser = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      phone: user.phone,
      profile: user.profile,
      isAdmin: user.isAdmin,
    };

    res.status(200).send(userWithoutPassword);
  } else {
    res.status(404).send("User not found");
  }
};

// API that checks if sent user exists
const checkIfUserAlreadyExists = async (req, res) => {
  const { username } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      let exists = "exists";
      return res.status(200).send(exists);
    } else {
      let exists = "not exist";
      return res.status(200).send(exists);
    }
  } catch (error) {
    return res.status(400).send("Error Checking");
  }
};

// @Update  PUT
// http://localhost:8000/api/v1/user/:id
const updateMyAccount = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "user not found" });
    return;
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete user" });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  checkIfUserAlreadyExists,
  updateMyAccount,
  allUsers,
  deleteUser,
};
