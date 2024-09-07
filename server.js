const express = require("express");
const dotenv = require("dotenv");
const dbConnector = require("./Config/DBconnection");

const app = express();
dbConnector();

app.use(express.json());

app.use("/", require("./Routes/URLroutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The app is running on PORT:${PORT}`);
});
