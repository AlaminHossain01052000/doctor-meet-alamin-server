const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const DonorCollection = require("../models/donorModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");


// GET All by donor
const getAllDonors = catchAsyncError(async (req, res, next) => {
    // console.log("get all with query hit");
    const { group, district, page, rows } = req.query;
    // console.log(group, district, page);

    let query = {};
    if (group === "All" && district === "All") {
        query = {};
    } else if (group === "All") {
        query = { district };
    } else if (district === "All") {
        query = { group };
    } else {
        query = { group, district };
    }
    // console.log(query);
    try {
        const LIMIT = rows;
        const startIndex = Number(page - 1) * LIMIT;
        const data = await DonorCollection.find(query)
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);
        const total = await DonorCollection.find(query).count();
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

const getDonorStats = catchAsyncError(async (req, res, next) => {
    //created by: copyright-> suresh vai

    try {
        const groupData = await DonorCollection.aggregate([
            { $group: { _id: "$group", count: { $sum: 1 } } },
            { $sort: { count: 1 } },
        ]);
        const districtData = await DonorCollection.aggregate([
            { $group: { _id: "$district", count: { $sum: 1 } } },
            { $sort: { count: 1 } },
        ]);
        const genderData = await DonorCollection.aggregate([
            { $group: { _id: "$gender", count: { $sum: 1 } } },
            { $sort: { count: 1 } },
        ]);
        const data = { groupData, districtData, genderData };

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
    const data = req.body;
    const result = DonorCollection.findByIdAndUpdate(
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
    deleteDonorData,
    getDonorStats
};