const express = require("express")
const router = express.Router()

const controllers = require("../controllers/user")

router.get("/me" , controllers.getProfile)
router.patch("/" , controllers.editProfile)
router.delete("/" , controllers.deleteProfile)

module.exports = router ; 