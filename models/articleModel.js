const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            // required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Articles", articleSchema);
