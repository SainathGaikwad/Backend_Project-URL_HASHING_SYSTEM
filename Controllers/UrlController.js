const generateHash = require("../Utilities/hashGenerator");
const Url = require("../Models/Structure");

const validateMaxClicks = (maxClicks) => {
  if (maxClicks !== undefined && maxClicks !== null) {
    if (maxClicks <= 0) {
      return "Maximum count should be positive number";
    }
  }
  return null;
};

const validateExpiresAt = (expiresAt) => {
  if (expiresAt) {
    const date = new Date(expiresAt);
    if (date <= new Date()) {
      return " An Expire date should be a proper date";
    }
  }
  return null;
};

const urlSizeReducer = async (req, res) => {
  const { originalurl, maxClicks, expiresAt } = req.body;

  if (!originalurl) {
    return res.status(400).json({
      success: false,
      message: "Please add an original URL",
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
      message: "URL stored in Database",
      shortUrl: `http://localhost:4000/${hash}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
        message: "URL Expired",
      });
    }

    if (urlData.maxClicks !== null && urlData.clickCount >= urlData.maxClicks) {
      return res.status(410).json({
        message: "URL COUNT LIMIT EXCEEDED",
      });
    }

    urlData.clickCount += 1;
    await urlData.save();

    return res.redirect(urlData.originalurl);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not redirecting",
    });
  }
};

module.exports = { urlSizeReducer, urlRedirector };
