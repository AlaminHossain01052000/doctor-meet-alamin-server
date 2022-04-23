const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    highBP: {
        type: String,
        required: true
    },
    lowBP: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    healthIssues: {
        type: String,
        required: true
    },
    pastHealthIssues: {
        type: String,
        required: true
    },
    doctorInfo: {
        id: Number,
        name: {
            type: String,
            required: true
        },
        username: String,
        email: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        specialist: {
            type: String,
            required: true
        },
        timeSlot: {
            type: String,
            required: true
        },
        visit: {
            type: String,
            required: true
        },
        address: {
            street: {
                type: String,
            },
            suite: String,
            city: String,
            zipcode: String,
            geo: {
                lat: {
                    type: String,
                    required: true
                },
                lng: {
                    type: String,
                    required: true
                }
            },
            phone: String,
            website: String,
            company: {
                name: String,
                catchPhrase: String,
                bs: String
            }
        }
    },
    status: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Appointments", appointmentSchema);