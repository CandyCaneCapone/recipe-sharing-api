const express = require("express");
const router = express.Router();

const controllers = require("../controllers/recipe");

router.get("/", controllers.getAllRecipes);
router.get("/:id", controllers.getSingleRecipe);
router.post("/", controllers.createRecipe);
router.patch("/:id", controllers.updateRecipe);
router.delete("/:id" , controllers.deleteRecipe)

module.exports = router;
