const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true,
        },
        patientEmail: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        healthIssues: {
            type: String,
            required: true,
        },
        appointmentTime: {
            type: Object,
            required: true,
        },
        appointmentDate: {
            type: Object,
            required: true,
        },
        payment: {
            type: Boolean,
        },
        doctorInfo: {
            id: String,
            name: {
                type: String,
                required: true,
            },
            username: String,
            email: {
                type: String,
                required: true,
            },
            img: {
                type: String,
                required: true,
            },
            specialist: {
                type: String,
                required: true,
            },
            timeSlot: {
                type: Array,
                required: true,
            },
            visit: {
                type: String,
                required: true,
            },
        },
        status: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointments", appointmentSchema);
