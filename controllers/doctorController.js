const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const DoctorsCollection = require("../models/doctorModel");
const router = express.Router();
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// GET All by doctor
const getAllDoctors = catchAsyncError(async (req, res, next) => {
    try {
        const data = await DoctorsCollection.find({});
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
})
// GET specific doctor by ID
const getDoctorById = catchAsyncError(async (req, res, next) => {
    try {
        const data = await DoctorsCollection.find({ _id: req.params.id });
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
})

// post doctor information

const addDoctor = catchAsyncError(async (req, res, next) => {
    const newDoctor = new DoctorsCollection(req.body);
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
})


// update doctor information
const updateDoctor = catchAsyncError(async (req, res, next) => {
    const result = DoctorsCollection.findByIdAndUpdate(
        { _id: req.params.id },
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
                    message: "Donor was updated successfully!",
                });
            }
        }
    );
})

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
})

module.exports = {
    getAllDoctors,
    updateDoctor,
    deleteDoctor,
    addDoctor,
    getDoctorById
};