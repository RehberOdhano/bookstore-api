const Book = require("../models/book");
const Transaction = require("../models/transaction");

exports.purchaseTheBook = (req, res) => {
  try {
    const bookId = req.params.id;
    const numberOfBooksToPurchase = req.body.quantity;
    // first we fetch the book the user wants to purchase, so we can how many copies
    // of the requested book are available in the store
    Book.findById(bookId).exec((err, book) => {
      if (err) {
        res.send({
          status: 500,
          success: false,
          message: err.message,
        });
      }
      // check if the requested number of copies is greater than the number of copies
      // available in the stock, then user can't buy that many copies
      else if (numberOfBooksToPurchase > book.stockQuantity) {
        res.send({
          status: 200,
          success: true,
          message: `ONLY ${book.stockQuantity} COPIES OF THE BOOK ${book.title} ARE LEFT`,
        });
      } else {
        const data = {
          bookId: bookId,
          userId: Math.random() * 10000,
          quantity: numberOfBooksToPurchase,
          transactionDate: new Date().toISOString(),
        };
        // adding a new record in the transaction table
        Transaction.create(data, (err, transaction) => {
          if (err) {
            res.send({
              status: 500,
              success: false,
              message: err.message,
            });
          } else {
            // updating the stockQuantity of the book that the user has purchased
            Book.findByIdAndUpdate(
              { _id: bookId },
              { stockQuantity: book.stockQuantity - numberOfBooksToPurchase }
            ).exec((err, updatedBook) => {
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
                  message: "SUCCESSFULLY PURCHASED THE BOOK",
                });
              }
            });
          }
        });
      }
    });
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
  }
};
