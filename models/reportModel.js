const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        DrName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
