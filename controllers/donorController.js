const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const DonorCollection = require("../models/donorModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");


// GET All by donor
const getAllDonors = catchAsyncError(async (req, res, next) => {
    try {
        const donors = await DonorCollection.find({});
        res.status(200).json({
            success: true,
            donors
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }

});

// GET specific donor by ID

const getDonorById = catchAsyncError(async (req, res, next) => {
    try {
        const donor = await DonorCollection.find({ _id: req.params.id });
        res.status(200).json({
            success: true,
            donor
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});


// post donor information

const addADonor = catchAsyncError(async (req, res, next) => {
    const newDonor = new DonorCollection(req.body);
    newDonor.save((err) => {
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

// update donor information

const updateDonorDetails = catchAsyncError(async (req, res, next) => {
    const result = DonorCollection.findByIdAndUpdate(
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

// DELETE Donor information
const deleteDonorData = catchAsyncError(async (req, res, next) => {
    DonorCollection.deleteOne({ _id: req.params.id }, (err) => {
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
    getAllDonors,
    getDonorById,
    addADonor,
    updateDonorDetails,
    deleteDonorData
};