const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Report = require("../models/reportModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// GET All by donor
const allReport = catchAsyncError(async (req, res, next) => {
    try {
        const data = await Report.find({});
        const total = await Report.find({}).count();
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

// POST A Report
const addReport = catchAsyncError(async (req, res, next) => {
    const newReport = new Report(req.body);
    newReport.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Report was inserted successfully!",
            });
        }
    });
});

module.exports = {
    addReport,
    allReport,
};
