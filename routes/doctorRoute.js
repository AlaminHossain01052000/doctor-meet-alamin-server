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
    getDoctorByEmail,
} = require("../controllers/doctorController");
const router = express.Router();

router.route("/doctors/all").get(getAllDoctors);

router.route("/doctors/add").post(addDoctor);

router.route("/doctors/statistics").get(getDoctorStats);

router.route("/doctors/single/:id").get(getDoctorById);
router.route("/doctors/email/:email").get(getDoctorByEmail);

router.route("/doctors/:id").put(updateDoctor).delete(deleteDoctor);

module.exports = router;
