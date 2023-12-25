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

const updateRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;

    const updateData = {
      title : req.body.title , 
      ingredients : req.body.ingredients , 
      instructions : req.body.instructions,
      cookingTime : req.body.cookingTime,
      tags : req.body.tags ,
    }
    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, createdBy: userId },
      updateData,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!recipe) {
      throw new NotFoundError(`no recipe found with id ${recipeId}`);
    }

    res.json({ message: "recipe updated", recipe });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
};
