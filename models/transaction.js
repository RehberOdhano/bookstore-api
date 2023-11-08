const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    userId: Number,
    quantity: Number,
    transactionDate: Date,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Transaction", transactionSchema);
