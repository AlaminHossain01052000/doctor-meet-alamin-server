const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    img1: {
        type: String,
        required: true
    },
    img2: {
        type: String,
        required: true
    },
    img3: {
        type: String,
        required: true
    },
    img4: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    inStock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            User: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
               
            },
            name: {
                type: String,
                
            },
            email:{
                type:String,
            },
            rating: {
                type: Number,
               
            },
            comment: {
                type: String,
                
            },
            img:{
                type:String,
                required:true
            }
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


productSchema.pre(/^find/, function (next) {

    this.populate({
        path: "user",
        select: "name email"
    })

    next();
})


module.exports = mongoose.model("Product", productSchema);
