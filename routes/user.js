const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorizationCheck } = require("../middlewares/authMiddlewares");

router.get("/", authorizationCheck, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:username", authorizationCheck, userController.deleteUser);

module.exports = router;
