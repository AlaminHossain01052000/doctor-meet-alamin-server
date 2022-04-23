const express = require('express');
const { getAllDoctors, addDoctor, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const router = express.Router();


router.route("/doctor/all").get(getAllDoctors);

router.route("/doctor/add").post(addDoctor);

router.route("/doctor/:id")
    .get(getDoctorById)
    .put(updateDoctor)
    .delete(deleteDoctor)

module.exports = router;