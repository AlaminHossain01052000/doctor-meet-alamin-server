const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    let token;
    if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
        token = req?.headers?.authorization.split(" ")[1];
    }
    // console.log(token);
    if (!token) {
        return next(
            new ErrorHandler("Please Login to access this resource", 401)
        );
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    /* after decoded data we can access user id by using decodedData.id because we previously (in userSchema methods) set {id: user_id} */
    req.user = await User.findById(decodedData.id);
    /* now we can access user data in req */

    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource `,
                    403
                )
            );
        }

        next();
    };
};
