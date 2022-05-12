const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Reviews = require("../models/reviewModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// GET All by donor
const allReviews = catchAsyncError(async (req, res, next) => {
    try {
        const data = await Reviews.find({}).sort({ rating: -1 });
        const total = await Reviews.find({}).count();
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
const addReview = catchAsyncError(async (req, res, next) => {
    const newReview = new Reviews(req.body);
    newReview.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Review was inserted successfully!",
            });
        }
    });
});

module.exports = {
    addReview,
    allReviews,
};
