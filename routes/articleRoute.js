const express = require("express");
const { addArticle, allArticles } = require("../controllers/articleController");
const router = express.Router();

router.route("/article").get(allArticles);
router.route("/article/add").post(addArticle);

module.exports = router;
