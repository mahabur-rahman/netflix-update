const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const autHeader = req.headers.token;

  if (autHeader) {
    const token = autHeader.split(" ")[1];
    // console.log(token);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      // console.log(`before req.user : `, req.user);  is gonna be undefined
      req.user = user;
      // console.log(`after req.user : `, req.user);  id : '676746', isAdmin : false
      next();
    });
  } else {
    return res.status(401).json("yor are not authenticated!");
  }
};

// export
module.exports = { verifyToken };
