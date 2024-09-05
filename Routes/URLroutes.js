const express = require("express");
const router = express.Router();
const {urlSizeReducer, urlRedirector} = require("../Controllers/UrlController");

// route to simplify or reduce the size of the reducer
router.post("/Shorten", urlSizeReducer);

// route to redirect to the corresponding url 
router.get("/:hash", urlRedirector);

module.exports = router;