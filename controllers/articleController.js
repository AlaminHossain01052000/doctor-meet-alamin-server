const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Articles = require("../models/articleModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

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

// POST A Review
const addArticle = catchAsyncError(async (req, res, next) => {
    const newReview = new Articles(req.body);
    newReview.save((err) => {
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
};
