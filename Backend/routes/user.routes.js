/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: user.routes.js
 * Description: This file handles the routes for the user requests.
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


// Import the express module and the user controller
// ********************************************************************************************************************
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// ********************************************************************************************************************
// ********************************************************************************************************************

/*  
--------------------------------------------------------------------------------------------------------------------------------------
                *****User Routes for the API (Backend)******
            1. Register route for the user - POST Request - /api/v1/users/register
            2. Login route for the user - POST Request - /api/v1/users/login
            3. Get a User by ID - GET Request - /api/v1/users/profile
            4. Logout a user - GET Request - /api/v1/users/logout
--------------------------------------------------------------------------------------------------------------------------------------  
*/



// Register a new user  - POST Request  -  /api/v1/users/register
router.post('/register', [
    // Validation of the request
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 4 }).withMessage("First Name must be at least 4 characters long"),
    body('fullname.lastname').isLength({ min: 4 }).withMessage("Last Name must be at least 4 characters long"),
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
], userController.registerUser);


// Login a user  - POST Request  -  /api/v1/users/login
router.post('/login', [
    // Validation of the request
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
],
    // userController.loginUser
    userController.loginUser);


// 3. GET Request: Get a User by ID
router.get("/profile", authMiddleware.authUser, userController.getProfile);

// 4. logout a user  - GET Request  -  /api/v1/users/logout
router.get('/logout', authMiddleware.authUser, userController.logoutUser);


/*
--------------------------------------------------------------------------------------------------------------------------------------
                                  *****************END OF USER ROUTES******************
-------------------------------------------------------------------------------------------------------------------------------------- 
*/

// Export the router
module.exports = router;