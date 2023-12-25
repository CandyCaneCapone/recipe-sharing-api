const User = require("../models/user");
const UnAuthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.email === req.body.email) {
      throw new UnAuthenticatedError("this email already exist");
    }

    await User.create(req.body);
    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new UnAuthenticatedError("please provide email and password");
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new UnAuthenticatedError("wrong email or password");
    }
    const isPasswordCorrect = await user.comparePassword(req.body.password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError("wrong email or password");
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.json({ message: "login was successful" , token});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
