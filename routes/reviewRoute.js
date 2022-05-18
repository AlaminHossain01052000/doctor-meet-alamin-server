const express = require("express");
const { addReview, allReviews } = require("../controllers/reviewController");
const router = express.Router();

router.route("/review").get(allReviews);
router.route("/review/add").post(addReview);

module.exports = router;
