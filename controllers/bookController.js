const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  try {
    Book.find({}).exec((err, books) => {
      if (err) {
        res.send({
          status: 500,
          success: false,
          message: err.message,
        });
      } else if (books == null || books.length == 0) {
        res.send({
          status: 200,
          success: true,
          books: [],
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "SUCCESSFULLY FETCHED ALL THE BOOKS",
          books: books,
        });
      }
    });
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
};

exports.getSpecificBook = (req, res) => {
  try {
    const bookId = req.params.id;
    Book.findById({ _id: bookId }).exec((err, book) => {
      if (err) {
        res.send({
          status: 500,
          success: false,
          message: err.message,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "SUCCESSFULLY FETCHED THE BOOK DETAILS",
          book: book,
        });
      }
    });
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
  }
};

exports.addNewBook = (req, res) => {
  try {
    const bookJSONData = req.body;
    const bookObj = {
      title: bookJSONData.title,
      author: bookJSONData.author,
      price: bookJSONData.price,
      stockQuantity: bookJSONData.stockQuantity,
    };

    Book.create(bookObj, (err, newBook) => {
      if (err) {
        res.send({
          status: 500,
          success: false,
          message: err.message,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          book: newBook,
        });
      }
    });
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
  }
};

exports.deleteBook = (req, res) => {
  try {
    const bookId = req.params.id;
    Book.findByIdAndDelete(bookId).exec((err, deletedBook) => {
      if (err) {
        res.send({
          status: 500,
          success: false,
          message: err.message,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "SUCCESSFULLY DELETED THE BOOK",
          book: deletedBook,
        });
      }
    });
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
  }
};
