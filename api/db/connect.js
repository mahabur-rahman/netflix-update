const mongoose = require("mongoose");
const DB = process.env.DATABASE;

const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(
      `MongoDB connected successfully : ${conn.connection.host}`.cyan.underline
    );
  } catch (err) {
    console.log(`No connection : ${err}`.red.underline);
  }
};

// export
module.exports = connectedDB;
