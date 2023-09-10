const app = require("./app");
const connectDB = require("./config/connectDB");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

const start = async () => {
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
