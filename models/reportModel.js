const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
    {
        drName: {
            type: String,
        },
        drEmail: {
            type: String,
        },
        file: {
            type: String,
        },
        patientName: {
            type: String,
        },
        patientEmail: {
            type: String,
        },
        desc: {
            type: String,
        },
        review: {
            type: String,
        },
        status: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
