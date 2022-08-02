const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserStats,
} = require("../controllers/user.controller");
const { verifyToken } = require("../controllers/verifyToken.controller");

// UPDATE
router.put("/:id", verifyToken, updateUser);
// DELETE
router.delete("/:id", verifyToken, deleteUser);
// GET SINGLE USER
router.get("/find/:id", getSingleUser);
// GET ALL USER
router.get("/", verifyToken, getAllUser);
// GET USER STATS
router.get("/stats", getUserStats);

// export
module.exports = router;
