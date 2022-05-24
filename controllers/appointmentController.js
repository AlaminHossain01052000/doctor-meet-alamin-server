const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Appointment = require("../models/appointmentModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// GET all appointment

const getAllAppointment = catchAsyncError(async (req, res, next) => {
    Appointment.find({})
        .select({
            __v: 0,
            date: 0,
        })
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: "Success",
                });
            }
        });
})


// GET A appointment by ID

const getAppointmentById = catchAsyncError(async (req, res, next) => {
    try {
        const data = await Appointment.find({ _id: req.params.id });
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


// POST An appointment

const addAnAppointment = catchAsyncError(async (req, res, next) => {
    const newAppointment = new Appointment(req.body);
    newAppointment.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Appointment was inserted successfully!",
            });
        }
    });
})


// POST MULTIPLE Appointment

const addMultipleAppointment = catchAsyncError(async (req, res, next) => {
    Appointment.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Appointment were inserted successfully!",
            });
        }
    });
})


// PUT Appointment

const updateAppointment = catchAsyncError(async (req, res, next) => {
    const result = Appointment.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                status: "active",
            },
        },
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
                    message: "Appointment was updated successfully!",
                });
            }
        }
    );
})


// DELETE Appointment

const deleteAppointment = catchAsyncError(async (req, res, next) => {
    Appointment.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Appointment was deleted successfully!",
            });
        }
    });
})


module.exports = {
    getAllAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    addAnAppointment,
    addMultipleAppointment,
};
