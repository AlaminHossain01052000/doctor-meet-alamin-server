const mongoose = require("mongoose");

const donorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        group: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = donorSchema;
