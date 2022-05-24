const express = require('express');
const { getAllAppointment, addAnAppointment, getAppointmentById, deleteAppointment, updateAppointment, getDoctorAppointments } = require('../controllers/appointmentController');
const router = express.Router();

router.route("/appointment").get(getAllAppointment);
router.route("/appointment/add").post(addAnAppointment);
router.route("/appointment/:id")
    .get(getAppointmentById)
    .put(updateAppointment)
    .delete(deleteAppointment)

module.exports = router;