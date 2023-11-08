// IMPORTED REQUIRED PACKAGES
const { express } = require("../utils/packages");

// ROUTER
const bookRouter = express.Router();

// CONTROLLERS
const bookController = require("../controllers/bookController");

// BOOK ROUTES
bookRouter.get("/all", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getSpecificBook);
bookRouter.post("/add", bookController.addNewBook);
bookRouter.delete("/delete/:id", bookController.deleteBook);

module.exports = bookRouter;
