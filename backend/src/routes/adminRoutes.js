const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middleware = require("../middleware/middleware");

router.get("/", middleware.verifyAdmin, userController.getUsers);
router.get("/:id", middleware.verifyAdmin, userController.getUserById);
router.put("/:id", middleware.verifyAdmin, userController.updateUserById);
router.delete("/:id", middleware.verifyAdmin, userController.deleteUserById);

module.exports = router;
