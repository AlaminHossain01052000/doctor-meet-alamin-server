const mongoose = require('mongoose');
const donorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    img: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Donor", donorSchema);