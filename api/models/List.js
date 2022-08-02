const mongoose = require("mongoose");

// listSchema
const listSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String },
  genre: { type: String },
  content: { type: Array },
});

// list Model
const ListModel = mongoose.model("List", listSchema);

// export
module.exports = ListModel;
