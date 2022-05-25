const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [4, "Name should have more than 4 characters"],
        },
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
            validate: [validator.isEmail, "Please Enter a valid Email"],
        },
        password: {
            type: String,
            required: [true, "Please Enter Your Password"],
            minLength: [6, "Password should be greater than 8 characters"],
        },
        image: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLhYhRYXrrS3OGaE4hCHZCQh99kuca9aBHCg&usqp=CAU"
        },
        // image: {
        //     // public_id: String,
        //     type: String,
        //     required: [true, "Please Enter Your Avatar Link"]
        //     // public_id: {
        //     //     type: String,
        //     //     required: true,
        //     // },
        //     // url: {
        //     //     type: String,
        //     //     required: true,
        //     // },
        // },
        role: {
            type: String,
            default: "user",
            enum: {
                values: ["user", "doctor", "moderator", "admin"],
                message: "User must required specified role.",
            },
        },

        resetPasswordToken: String,
        resetPasswordExpire: Date,
        reports: [
            {
                file: {
                    type: String,
                },
                patientId: {
                    type: String,
                },
                desc: {
                    type: String,
                },
                review: {
                    type: String,
                },
                status: {
                    type: Boolean,
                },
            },
        ],
        notification: [
            {
                message: {
                    type: String,
                },
                date: {
                    type: Object,
                },
                status: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
        // toJSON: {
        //     transform: (doc, ret) => {
        //         delete ret.password;
        //         delete ret.__v;
        //         return ret;
        //     }
        // }
    }
);

userSchema.pre("save", async function (next) {
    /* in-case user don't change his password so hashed password will be again hashed to prevent this case we can use a condition*/
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userSchema.methods.getJWTToken = function () {
    // letter we will use this id for getProducts and etc. actions.
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
