const express = require("express");
const { addReport, allReport } = require("../controllers/reportController");
const router = express.Router();

router.route("/report").get(allReport);
router.route("/report/add").post(addReport);

module.exports = router;
