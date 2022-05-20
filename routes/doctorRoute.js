const express = require("express");
const {
    getAllDoctors,
    addDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getDoctorStats,
    addReport,
    deleteReportById,
    addReview,
} = require("../controllers/doctorController");
const router = express.Router();

router.route("/doctors/all").get(getAllDoctors);

router.route("/doctors/add").post(addDoctor);

router.route("/doctors/statistics").get(getDoctorStats);

router.route("/doctors/single/:id").get(getDoctorById);

router.route("/doctors/:id").put(updateDoctor).delete(deleteDoctor);

router.route("/report/:id").put(addReport);
router.route("/report/:idr/:idd").delete(deleteReportById);
router.route("/reportReview/:idr/:idd").put(addReview);

module.exports = router;
