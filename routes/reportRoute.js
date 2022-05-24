const express = require("express");
const {
    addReport,
    allReport,
    deleteReport,
    addReview,
    allReportBydEmail,
    allReportBypEmail,
} = require("../controllers/reportController");
const router = express.Router();

router.route("/report").get(allReport);
router.route("/report/doctor/:email").get(allReportBydEmail);
router.route("/report/patient/:email").get(allReportBypEmail);
router.route("/report").post(addReport);
router.route("/report/:id").delete(deleteReport);
router.route("/report/:id").put(addReview);

module.exports = router;
