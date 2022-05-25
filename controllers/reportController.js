// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const ReportsCollection = require("../models/reportModel");
// const ApiFeatures = require("../utils/ApiFeatures");
// const ErrorHandler = require("../utils/ErrorHandler");

// GET All by donor
const allReport = catchAsyncError(async (req, res, next) => {
    try {
        const data = await ReportsCollection.find({}).sort({ status: 1 });
        const total = await ReportsCollection.find({}).count();
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

const allReportBydEmail = catchAsyncError(async (req, res, next) => {
    try {
        const query = { drEmail: req.params.email };
        const data = await ReportsCollection.find(query).sort({ status: 1 });
        const total = await ReportsCollection.find(query).count();
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

const allReportBypEmail = catchAsyncError(async (req, res, next) => {
    try {
        const query = { patientEmail: req.params.email };
        const data = await ReportsCollection.find(query).sort({ status: 1 });
        const total = await ReportsCollection.find(query).count();
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
    const newReport = new ReportsCollection(req.body);
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

//delete a report
const deleteReport = catchAsyncError(async (req, res, next) => {
    ReportsCollection.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Report deleted successfully!",
            });
        }
    });
});

//add review
const addReview = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const result = ReportsCollection.findByIdAndUpdate(
        { _id: req.params.id },
        data,
        {
            new: true,
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Review updated successfully!",
                });
            }
        }
    );
});

module.exports = {
    addReport,
    allReport,
    addReview,
    deleteReport,
    allReportBydEmail,
    allReportBypEmail,
};
