const express = require("express");
const { addArticle, allArticles,getSingleArticle } = require("../controllers/articleController");

const router = express.Router();

router.route("/article").get(allArticles);
router.route("/article/add").post(addArticle);
router.route("/article/:id").get(getSingleArticle);


module.exports = router;
