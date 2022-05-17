const catchAsyncError = require("../middleware/catchAsyncError");

const deleteOne = (model, id) => catchAsyncError(async (req, res, next) => {

    await model.findOneByIdAndDelete(id);
    res.status(204).json({
        message: "Document Deleted Successfully"
    })

});

module.exports = deleteOne;