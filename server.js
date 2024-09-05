const express = require("express");
const dotenv = require("dotenv");
const dbConnector = require("./Config/DBconnection");

// getting the express app initiated
const app = express();
// connection establishing with db
dbConnector();

// adding the parsing middleware
app.use(express.json());

// mounting of routes 
app.use("/", require("./Routes/URLroutes"));

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log(`The app has started running on PORT:${PORT}`);
})


