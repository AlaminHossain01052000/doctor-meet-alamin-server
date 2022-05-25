const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Articles = require("../models/articleModel");
// const ApiFeatures = require("../utils/apiFeatures");
// const ErrorHandler = require("../utils/errorHandler");

// GET All by donor
const allArticles = catchAsyncError(async (req, res, next) => {
    try {
        const data = await Articles.find({}).sort({ rating: -1 });
        const total = await Articles.find({}).count();
        res.status(200).json({
            result: data,
            total: total,
            message: "Success",
        });
    } catch (err) {
        res.status(500).json({
            error: "Not found any results.",
        });
    }
});

const getSingleArticle = catchAsyncError(async (req, res, next) => {
    const Article = await Articles.find({ _id: req.params.id });

    if (!Article) {
        return next(new ErrorHandler("Articles not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        Article,
    });
});

// POST A Review
const addArticle = catchAsyncError(async (req, res, next) => {
    const newArticle = new Articles(req.body);
    newArticle.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Article was inserted successfully!",
            });
        }
    });
});

module.exports = {
    addArticle,
    allArticles,
    getSingleArticle,
};
