const HttpError = require("../models/http-error");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "tan nguyen",
    email: "test@test.com",
    password: "testers",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid email or password", 422));
  }
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "could not find existing user with that email",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exists already, please login", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Sign up failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // see if user exists in database, using email
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Could not find user, credentials are invalid", 401)
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
