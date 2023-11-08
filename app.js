// imported the required packages
const { express, cors, path } = require("./utils/packages");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// STATIC FOLDER
app.use("/public", express.static(path.join(__dirname, "public")));

// ROUTES
const bookRoutes = require("./routes/bookRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
