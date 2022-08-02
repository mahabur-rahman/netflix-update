const MovieModel = require("../models/Movie");

// CREATE A NEW MOVIE
const createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new MovieModel(req.body);
    try {
      const savedMovie = await newMovie.save();
      return res.status(201).json(savedMovie);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("You are not allowed to create movie, because you are not admin!");
  }
};

// UPDATE MOVIE
const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedMovie);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you cant update movie!");
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await MovieModel.findByIdAndDelete(req.params.id);

      return res.status(200).json("The movie has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you are not allowed to do that..");
  }
};

// GET SINGLE MOVIE
const getSingleMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET RANDOM MOVIE
const getRandomMovie = async (req, res) => {
  const type = req.query.type;

  let movie;

  try {
    if (type === "series") {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }

    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET ALL MOVIE
const getAllMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await MovieModel.find();

      return res.status(200).json(movies.reverse());
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not allowed to do that!");
  }
};

// export
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getSingleMovie,
  getRandomMovie,
  getAllMovie,
};
