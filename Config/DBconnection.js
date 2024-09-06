const mongoose = require("mongoose");
require('dotenv').config();


function for establishing the connection with DB
const dbConnector = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("The database is connected successfully");
  } catch (err) {
    console.log("Error occured while connecting with the database");
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = dbConnector;



