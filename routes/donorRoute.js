const express = require('express');
const router = express.Router();
const {
    addADonor,
    getAllDonors,
    getDonorById,
    deleteDonorData,
    updateDonorDetails,
    getDonorStats
} = require('../controllers/donorController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route("/donor").get(getAllDonors);
router.route("/donor/add").post(isAuthenticatedUser, authorizeRoles("admin"), getAllDonors);

router.route("/donor/single/:id")
    .get(getDonorById)

router.route("/donor/statistics")
    .get(getDonorStats)

router.route("/donor/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDonorData)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateDonorDetails)

module.exports = router;