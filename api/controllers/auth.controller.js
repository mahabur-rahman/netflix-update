const UserModel = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER | POST
const userRegister = async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    // password: req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// LOGIN
const userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    // console.log(user);
    if (!user) {
      return res.status(401).json("User not found!");
    }

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    // console.log(originalPassword);  return real pass : 123456

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Pass are not matching");
    }

    // jwt
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // console.log(accessToken);

    const { password, ...info } = user._doc;

    // return res.status(200).json(user);
    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// export
module.exports = {
  userRegister,
  userLogin,
};
