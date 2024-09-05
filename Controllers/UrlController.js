const generateHash = require("../Utilities/hashGenerator");
const Url = require("../Models/Structure");

// Validation of maxClicks over the URL
const validateMaxClicks = (maxClicks) => {
  if (maxClicks !== undefined && maxClicks !== null) {
    if (maxClicks <= 0) {
      return "The maxClick count should be a positive integer number";
    }
  }
  return null;
};

// Validation of URL expiration time
const validateExpiresAt = (expiresAt) => {
  if (expiresAt) {
    // Getting the actual date format for further assessment
    const date = new Date(expiresAt);
    if (date <= new Date()) {
      return "Expires date must be a future valid date";
    }
  }
  return null;
};

// URL size reducer controller
const urlSizeReducer = async (req, res) => {
  // Fetching the data from the request body
  const { originalurl, maxClicks, expiresAt } = req.body;

  // Validation of data
  if (!originalurl) {
    return res.status(400).json({
      success: false,
      message: "Original URL is required for further process",
    });
  }

  const validatedMaxClicks = validateMaxClicks(maxClicks);
  if (validatedMaxClicks) {
    return res.status(400).json({
      success: false,
      message: validatedMaxClicks,
    });
  }

  const validatedExpiresAt = validateExpiresAt(expiresAt);
  if (validatedExpiresAt) {
    return res.status(400).json({
      success: false,
      message: validatedExpiresAt,
    });
  }

  // Generating a hash for the corresponding URL
  // Followed by making the DB entry
  const hash = generateHash();
  const urlEntry = new Url({
    originalurl,
    hash,
    maxClicks: maxClicks || null,
    expiresAt: expiresAt ? new Date(expiresAt) : null,
  });

  try {
    await urlEntry.save();
    return res.status(200).json({
      success: true,
      message: "The URL has been securely stored in the DB",
      shortUrl: `http://localhost:4000/${hash}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// URL Redirector Controller
const urlRedirector = async (req, res) => {
  const { hash } = req.params;

  try {
    const urlData = await Url.findOne({ hash });
    if (!urlData) {
      return res.status(410).json({
        message: "No URL found",
      });
    }

    if (urlData.expiresAt && new Date() > urlData.expiresAt) {
      return res.status(410).json({
        message: "The URL is expired",
      });
    }

    if (urlData.maxClicks !== null && urlData.clickCount >= urlData.maxClicks) {
      return res.status(410).json({
        message: "The URL access count limit has been exceeded",
      });
    }

    urlData.clickCount += 1;
    await urlData.save();

    // Redirecting the client to target URL corresponding to the hash number
    return res.redirect(urlData.originalurl);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to redirect to the targeted URL",
    });
  }
};

module.exports = { urlSizeReducer, urlRedirector };
