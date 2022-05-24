const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const catchAsyncError = require("../middleware/catchAsyncError");
const DoctorsCollection = require("../models/doctorModel");
const UsersCollection = require("../models/userModel");
const router = express.Router();
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

// GET All by doctor
const getAllDoctors = catchAsyncError(async (req, res, next) => {
    const { specialist, gender, page, rows } = req.query;
    // console.log(specialist, gender, page);

    let query = {};
    if (specialist === "All" && gender === "All") {
        query = {};
    } else if (specialist === "All") {
        query = { gender };
    } else if (gender === "All") {
        query = { specialist };
    } else {
        query = { specialist, gender };
    }
    // console.log(query);
    try {
        const LIMIT = rows;
        const startIndex = Number(page - 1) * LIMIT;
        const data = await DoctorsCollection.find(query)
            .sort({ review: -1 })
            .limit(LIMIT)
            .skip(startIndex);
        const total = await DoctorsCollection.find(query).count();
        res.status(200).json({
            result: data,
            total: total,
            message: "Success",
        });
    } catch (err) {
        res.status(500).json({
            error: "Donor not found.",
        });
    }
});

const getDoctorStats = catchAsyncError(async (req, res, next) => {
    //created by: copyright-> suresh vai
    try {
        const specialistData = await DoctorsCollection.aggregate([
            { $group: { _id: "$specialist", count: { $sum: 1 } } },
            { $sort: { count: 1 } },
        ]);
        const experienceData = await DoctorsCollection.aggregate([
            { $group: { _id: "$experience", count: { $sum: 1 } } },
            { $sort: { count: 1 } },
        ]);
        const genderData = await DoctorsCollection.aggregate([
            { $group: { _id: "$gender", count: { $sum: 1 } } },
            { $sort: { count: 1 } },
        ]);
        const data = { specialistData, experienceData, genderData };

        res.status(200).json({
            result: data,
            message: "Success",
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

// GET specific doctor by ID
const getDoctorById = catchAsyncError(async (req, res, next) => {
    try {
        const data = await DoctorsCollection.find({ _id: req.params.id });
        res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

// GET specific doctor by email
const getDoctorByEmail = catchAsyncError(async (req, res, next) => {
    try {
        const data = await DoctorsCollection.find({ email: req.params.email });
        res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

// post doctor information
const addDoctor = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    data["approved"] = false;
    const newDoctor = new DoctorsCollection(data);

    newDoctor.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Donor information was inserted successfully!",
            });
        }
    });
});

// update doctor information
const updateDoctor = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const result = DoctorsCollection.findByIdAndUpdate(
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
                    message: "Doctor was updated successfully!",
                });
            }
        }
    );
});

const approveDoctor = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    // console.log(data);

    const result2 = await UsersCollection.findOneAndUpdate(
        { email: req.params.email },
        { role: "doctor" }
    );

    const result1 = await DoctorsCollection.findOneAndUpdate(
        { email: req.params.email },
        data
    );

    res.status(200).json({
        message: "Doctor approval done successfully!",
    });
});

const addUserReview = catchAsyncError(async (req, res, next) => {
    const review = req.body;
    const data = await DoctorsCollection.find({ _id: req.params.id });
    const reviews = data[0].UserReview;
    const newReviews = [...reviews, review];
    const result = DoctorsCollection.findByIdAndUpdate(
        { _id: req.params.id },
        { UserReview: newReviews },
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
                    message: "Doctor was updated successfully!",
                });
            }
        }
    );
});

// DELETE Doctor information
const deleteDoctor = catchAsyncError(async (req, res, next) => {
    DoctorsCollection.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Donor was deleted successfully!",
            });
        }
    });
});

module.exports = {
    getAllDoctors,
    updateDoctor,
    deleteDoctor,
    addDoctor,
    getDoctorById,
    getDoctorStats,
    addUserReview,
    getDoctorByEmail,
    approveDoctor,
};
