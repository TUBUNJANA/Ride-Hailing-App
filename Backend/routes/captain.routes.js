/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: captain.routes.js
 * Description: This file handles the routes for the captain requests. 
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
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');


/* 
--------------------------------------------------------------------------------------------------------------------------------------
                                    *****************CAPTAIN ROUTES******************
                                    1. Register route for the captain - POST Request - /api/v1/captains/register
                                    2. Login route for the captain - POST Request - /api/v1/captains/login
                                    3. Get Captain route for the captain - GET Request - /api/v1/captains/getCaptain
                                    4. Logout a captain - GET Request - /api/v1/captains/logout
--------------------------------------------------------------------------------------------------------------------------------------
*/


// Captains Routes for the API (Backend) to handle captain requests.
// 1. Register route for the captain - POST Request - /api/v1/captains/register
router.post('/register', [
    // Validation of the request
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 4 }).withMessage("First Name must be at least 4 characters long"),
    body('fullname.lastname').isLength({ min: 4 }).withMessage("Last Name must be at least 4 characters long"),
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Plate must be at least 3 characters long"),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid Vehicle Type"),
], captainController.registerCaptain);

// 2. Login route for the captain - POST Request - /api/v1/captains/login
router.post('/login', [
    // Validation of the request
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
],
    captainController.loginCaptain);

// 3. Get Captain route for the captain - GET Request - /api/v1/captains/getCaptain
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptain);

// 4. Logout a captain - GET Request - /api/v1/captains/logout
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

/* 
--------------------------------------------------------------------------------------------------------------------------------------
                                    *****************END OF CAPTAIN ROUTES******************
--------------------------------------------------------------------------------------------------------------------------------------
*/


// Export the router
module.exports = router;