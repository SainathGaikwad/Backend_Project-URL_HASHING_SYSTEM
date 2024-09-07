const mongoose = require("mongoose");
require("dotenv").config();

const dbConnector = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error");
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = dbConnector;
