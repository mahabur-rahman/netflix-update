const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/verifyToken.controller");
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getSingleMovie,
  getRandomMovie,
  getAllMovie,
} = require("../controllers/movie.controller");

// CREATE
router.post("/", verifyToken, createMovie);

// UPDATE
router.put("/:id", verifyToken, updateMovie);

// DELETE
router.delete("/:id", verifyToken, deleteMovie);

// GET SINGLE
router.get("/find/:id", verifyToken, getSingleMovie);

// GET RANDOM
router.get("/random", verifyToken, getRandomMovie);

// GET ALL
router.get("/", verifyToken, getAllMovie);

// export
module.exports = router;
