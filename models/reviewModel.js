const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
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
        rating: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Reviews", reviewSchema);
