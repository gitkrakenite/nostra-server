const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  allUsers,
  checkIfUserAlreadyExists,
  updateMyAccount,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", allUsers);
router.post("/check", checkIfUserAlreadyExists);
router.get("/:id", getUser);
router.delete("/:id", protect, deleteUser);
router.put("/:id", protect, updateMyAccount);

module.exports = router;
