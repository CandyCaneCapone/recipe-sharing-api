const Recipe = require("../models/recipe");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({});
    res.json({ recipes });
  } catch (error) {
    next(error);
  }
};

const getSingleRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      throw new NotFoundError(`no recipe found with id ${recipeId}`);
    }
    res.json({ recipe });
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    req.body.createdBy = req.user._id;
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ message: "recipe created", recipe });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
};
