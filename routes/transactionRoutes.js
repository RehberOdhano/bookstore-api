// IMPORTED REQUIRED PACKAGES
const { express } = require("../utils/packages");

// ROUTER
const transactionRouter = express.Router();

// CONTROLLERS
const transactionController = require("../controllers/transactionController");

// TRANSACTION ROUTES
transactionRouter.post("/purchase/:id", transactionController.purchaseTheBook);

module.exports = transactionRouter;
