const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
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
        specialist: {
            type: String,
            required: true,
        },
        visit: {
            type: Number,
            required: true,
        },
        review: {
            type: Number,
        },
        numberOfReview: {
            type: Number,
        },
        address: [
            {
                street: {
                    type: String,
                },
                suite: {
                    type: String,
                },
                city: {
                    type: String,
                },
                zipcode: {
                    type: String,
                },
                geo: [
                    {
                        lat: {
                            type: String,
                        },
                    },
                ],
            },
        ],
        experience: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        free: {
            type: Boolean,
            required: true,
        },
        appointmentDay: [
            {
                type: String,
                required: true,
            },
        ],
        phone: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        company: [
            {
                name: {
                    type: String,
                },
                catchPhrase: {
                    type: String,
                },
                bs: {
                    type: String,
                },
            },
        ],
        reports: [
            {
                file: {
                    type: String,
                },
                patientId: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
