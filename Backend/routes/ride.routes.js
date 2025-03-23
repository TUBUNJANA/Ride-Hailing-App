/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: captain.routes.js
 * Description: This rouer file handles the ride request for the captain requests. 
 * 
 * Developer: Tubun Jana
 * Position: Software Developer
 * Company: -----------------
 * Date Created: 08/03/2025
 * Last Modified: [MM/DD/YYYY] (if applicable)
 * Version: 1.0
 * 
 * Contact Information: Kolkata, West Bengal, India
 * Email: -------------------------
 * Slack: -------------------------
 * 
 * License: [License type if applicable, like MIT, GPL, etc.]
 *
 * Notes:
 * - [Add any important notes for this file (e.g., potential issues, things to revisit, etc.)]
 * 
 * Copyright (c) [Company Name], [Year]. All rights reserved.
--------------------------------------------------------------------------------------------------------------------------------------
 */


// Init the express router for the API (Backend)
// ********************************************************************************************************************
const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');

/* 
--------------------------------------------------------------------------------------------------------------------------------------
                                    *****************RIDE ROUTES******************
                                    1. 
                                    2. 
                                    3. 
                                    4. 
--------------------------------------------------------------------------------------------------------------------------------------
*/

// 1. Route to create a new ride request
// This route validates the request body for userId, pickup, destination, and vehicleType.
// It also ensures the user is authenticated before allowing the ride creation.
router.post('/create', [
    // Validation of the request
    body('pickup').isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
    body('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination location"),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid vehicle type"),
], authMiddleware.authUser, rideController.createRide);

// 2. Route to calculate the fare for all vehicles based on pickup and destination
// This route validates the request body for pickup and destination.
// It ensures the user is authenticated before allowing fare calculation.
router.get('/get-fare', [
    // Validation of the request
    query('pickup').isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
    query('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination location"),
], authMiddleware.authUser, rideController.calculateFare);

// 3. Route to confirm a ride by the captain
// This route validates the request body for captainId and rideId.
// It ensures the captain is authenticated before allowing ride confirmation.
router.post('/confirm', [
    // Validation of the request
    body('rideId').isString().withMessage("Invalid ride ID"),
], authMiddleware.authCaptain, rideController.confirmRide);


// 4. Route to start a ride
// This route validates the request body for rideId and otp.
// It ensures the captain is authenticated before allowing the ride to start.
router.post('/start-ride', [
    // Validation of the request
    body('rideId').isString().withMessage("Invalid ride ID"),
    body('otp').isNumeric().withMessage("Invalid OTP"),
], authMiddleware.authCaptain, rideController.startRide);

// 5. Route to end a ride
// This route validates the request body for rideId and ensures the captain is authenticated before allowing the ride to end.
router.post('/end-ride', [
    // Validation of the request
    body('rideId').isString().withMessage("Invalid ride ID"),
], authMiddleware.authCaptain, rideController.endRide);

/* 
--------------------------------------------------------------------------------------------------------------------------------------
                                    *****************END OF RIDE ROUTES******************
--------------------------------------------------------------------------------------------------------------------------------------
*/


// Export the router
module.exports = router;