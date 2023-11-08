const { mongoose } = require("./utils/packages");
require("dotenv").config();

const URL = process.env.URL;
const PORT = process.env.PORT || 3000;

const connect_db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL);
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.log("DB-ERROR: " + error);
  }

  // starting the app right after the successful connection to the databse
  const app = require("./app");

  app.listen(PORT, () => {
    console.log(
      `SERVER IS STARTED SUCCESSFULLY...! LISTENING TO PORT ${PORT}... WE'RE GOOD TO GO!`
    );
  });
};

connect_db();
