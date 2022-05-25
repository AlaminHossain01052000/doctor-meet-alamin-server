const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/ErrorHandler");

//create product --Admin Route
const createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user._id;
    // console.log(req.body);
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// get all product
const getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 12;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    // it should be clear

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
    });
});
// Get All Product (Admin)
const getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Update Product --Admin
const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found",
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

//Delete Product --Admin
const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found",
        });
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully!",
    });
});

const addProduct = catchAsyncError(async (req, res, next) => {
    const newDoctor = new Product(req.body);
    newDoctor.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Product inserted successfully!",
            });
        }
    });
});

// get single product
const getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));

        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found",
        // })
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Create New Review or Update the review
const createProductReview = catchAsyncError(async (req, res, next) => {
    const review = req.body;
    const data = await Product.find({ _id: req.params.id });
    const reviews = data[0].reviews;
    const newReviews = [...reviews, review];
    const result = Product.findByIdAndUpdate(
        { _id: req.params.id },
        { reviews: newReviews },
        {
            new: true,
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Doctor was updated successfully!",
                });
            }
        }
    );
});

// Get All Reviews of a product
const getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
const deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

module.exports = {
    createProduct,
    getAdminProducts,
    getAllProducts,
    getProductDetails,
    getProductReviews,
    deleteProduct,
    deleteReview,
    createProductReview,
    updateProduct,
    addProduct,
};
