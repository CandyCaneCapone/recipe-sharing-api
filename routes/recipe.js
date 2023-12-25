const express = require("express");
const router = express.Router();

const controllers = require("../controllers/recipe");

router.get("/", controllers.getAllRecipes);
router.get("/:id" , controllers.getSingleRecipe)

module.exports = router;
