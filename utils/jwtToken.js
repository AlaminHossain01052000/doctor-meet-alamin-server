// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
    };

    // if (process.env.NODE_ENV === "production") {
    //     options.secure = true;
    // }
    // res.cookie("jwt", token, options)
    // res.status(statusCode).json({
    //     success: true,
    //     user,
    //     token,
    // });

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
