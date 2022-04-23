const express = require('express');
const { getAllAppointment, addAnAppointment, getAppointmentById, deleteAppointment, updateAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.route("/appointment").get(getAllAppointment);
router.route("/add").post(addAnAppointment);
router.route("/appointment/:id")
    .get(getAppointmentById)
    .put(updateAppointment)
    .delete(deleteAppointment)

module.exports = router;