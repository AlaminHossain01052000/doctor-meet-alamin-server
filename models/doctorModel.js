const mongoose = require("mongoose");


const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
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
    visit: {
        type: Number,
        required: true
    },
    review: {
        type: Number
    },
    numberOfReview: {
        type: Number
    },
    address: [{
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
        geo: [{
            lat: {
                type: String,
            },
            lag: {
                type: String,
            },
        }]
    }],
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    company: [{
        name: {
            type: String,
        },
        catchPhrase: {
            type: String,
        },
        bs: {
            type: String,
        }
    }]
});

module.exports = mongoose.model("Doctor", doctorSchema);