const express = require("express");
const router = express.Router();
const {
  urlSizeReducer,
  urlRedirector,
} = require("../Controllers/UrlController");

router.post("/URLShortner", urlSizeReducer);

router.get("/:hash", urlRedirector);

module.exports = router;
