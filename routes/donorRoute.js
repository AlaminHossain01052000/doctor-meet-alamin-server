const express = require('express');
const router = express.Router();
const {
    addADonor,
    getAllDonors,
    getDonorById,
    deleteDonorData,
    updateDonorDetails
} = require('../controllers/donorController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route("/donor/all").get(getAllDonors);
router.route("/donor/add").post(isAuthenticatedUser, authorizeRoles("admin"), getAllDonors);

router.route("/donor/:id")
    .get(getDonorById)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDonorData)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateDonorDetails)

module.exports = router;