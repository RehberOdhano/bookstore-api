const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    price: Number,
    stockQuantity: Number,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Book", bookSchema);
