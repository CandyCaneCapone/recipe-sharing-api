const Recipe = require("../models/recipe");
const NotFoundError = require("../errors/not-found");

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


module.exports = {
  getAllRecipes,
  getSingleRecipe,
};
