const UserModel = require("../models/User");

// UPDATE
const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updateUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      return res.status(200).json(updateUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json(`you can update only your account!`);
  }
};

// DELETE
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);

      return res.status(200).json("User has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    // console.log(user);
    const { password, ...info } = user._doc;
    return res.status(200).json(info);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET ALL USER
const getAllUser = async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query
        ? await UserModel.find().sort({ _id: -1 }).limit(5)
        : await UserModel.find();

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

// USER STATS
const getUserStats = async (req, res) => {
  const date = new Date();

  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  //   console.log(lastYear);

  //   const monthsArray = [
  //     "jan",
  //     "feb",
  //     "mar",
  //     "apr",
  //     "may",
  //     "june",
  //     "july",
  //     "aug",
  //     "sep",
  //     "oct",
  //     "nov",
  //     "dec",
  //   ];

  try {
    const data = await UserModel.aggregate([
      //   { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          //   month: { $year: "$createdAt" },
        },
      },

      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// export
module.exports = {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserStats,
};
