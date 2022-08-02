const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/verifyToken.controller");

const {
  createList,
  deleteList,
  getList,
} = require("../controllers/list.controller");

// CREATE
router.post("/", verifyToken, createList);

// DELETE
router.delete("/:id", verifyToken, deleteList);

// GET
router.get("/", verifyToken, getList);

// export
module.exports = router;
