const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middleware = require("../middleware/middleware");

router.get("/", middleware.verifyUser, userController.getUserById);
router.put("/", middleware.verifyUser, userController.updateUserById);
router.delete("/", middleware.verifyUser, userController.deleteUserById);

module.exports = router;
