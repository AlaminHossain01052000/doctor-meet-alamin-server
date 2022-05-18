const catchAsyncError = require("../middleware/catchAsyncError");

const deleteOne = (model) => catchAsyncError(async (req, res, next) => {

    await model.findOneByIdAndDelete(req.params.id);
    res.status(204).json({
        message: "Document Deleted Successfully"
    })

});

module.exports = deleteOne;