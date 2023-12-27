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
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookingTime: req.body.cookingTime,
      tags: req.body.tags,
    };
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

const deleteRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;

    const recipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      createdBy: userId,
    });

    if (!recipe) {
      throw new NotFoundError(`no recipe found with id ${recipeId}`);
    }

    res.json({ message: "recipe deleted", recipe });
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new NotFoundError(`no recipe found with id ${recipeId}`);
    }

    recipe.comments.push({
      comment: req.body.comment,
      user: req.user._id,
    });

    await recipe.save();

    res.json({ message: "comment added" });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { recipeId, commentId } = req.params;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new NotFoundError(`no recipe found with id ${recipeId}`);
    }

    const commentIndex = recipe.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      throw new NotFoundError(`no comment found with id ${commentId}`);
    }

    recipe.comments.splice(commentIndex, 1);

    await recipe.save()

    res.json({message : "comment deleted"})
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addComment,
  deleteComment,
};
