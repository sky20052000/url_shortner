const express = require("express");
const urlController = require("../controller/urlController");
const router = express.Router();

router.post("/shorten", urlController.generateUrl);
router.get("/:shortId", urlController.getOriginalUrl);

module.exports = router;
