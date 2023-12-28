const User = require("../models/user");
const Recipe = require("../models/recipe");
const NotFoundError = require("../errors/not-found");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      throw new NotFoundError(`user not found`);
    }
    const recipes = await Recipe.find({ createdBy: req.user._id });
    res.json({ user, recipes });
  } catch (error) {
    next(error);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: req.body.username,
      },
      { runValidators: true, new: true }
    );

    if (!user) {
      throw new NotFoundError(`user not found`);
    }

    res.json({ message: "user edited", user });
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      throw new NotFoundError(`user not found`);
    }

    await Recipe.deleteMany({ createdBy: req.user._id });

    res.json({ message: "user deleted", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  editProfile,
  deleteProfile,
};
