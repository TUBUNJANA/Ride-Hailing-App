/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: captain.controller.js
 * Description: This file create the captain controller. 
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

// Importing all teh required modules to create the captain controller.
// ********************************************************************************************************************
const captainModel = require('../models/captain.model');
const { createCaptainService } = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

/*
--------------------------------------------------------------------------------------------------------------------------------------
                ******* All functions for the Captain Controller ********
                1. Register a new captain - POST Request  -  /api/v1/captains/register
                2. Login a captain - POST Request  -  /api/v1/captains/login
                3. Get Captain - GET Request - /api/v1/captains/getCaptain
                4. Logout a captain - GET Request - /api/v1/captains/logout
--------------------------------------------------------------------------------------------------------------------------------------
*/


// 1. Register a new captain - POST Request  -  /api/v1/captains/register
const registerCaptain = async (req, res, next) => {
    // Validate the request
    const errors = validationResult(req);
    // If there are errors in the request, return the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request
    const { email, fullname, password, vehicle } = req.body;
    // Check if the captain already exists
    const captainExists = await captainModel.findOne({ email });
    // If the captain already exists, return an error
    if (captainExists) {
        return res.status(400).json({ error: "Captain already exists" });
    }
    const { firstname, lastname } = fullname;
    const { color, plate, vehicleType, capacity } = vehicle;
    // Create a new captain
    const captain = await createCaptainService({ firstname, lastname, email, password, color, plate, vehicleType, capacity });
    // Generate a token for the captain
    const token = await captain.generateAuthToken();
    // Remove the password from the response
    captain.password = undefined;
    // Send the response
    res.status(201).json({ captain, token });
}

// 2. Login a captain - POST Request  -  /api/v1/captains/login
const loginCaptain = async (req, res, next) => {
    // Validate the request
    const errors = validationResult(req);
    // If there are errors in the request, return the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request
    const { email, password } = req.body;
    // Find a captain by email and password
    const captain = await captainModel.findOne({ email }).select("+password");

    // If the captain is not found, return an error
    if (!captain) {
        return res.status(401).json({ error: "Invalid Email or Password" });
    }
    // Compare the password
    const isMatch = await captain.comparePassword(password);
    // If the password does not match, return an error
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid Email or Password" });
    }
    // Remove the password from the response
    captain.password = undefined;
    // Generate a token for the captain
    const token = await captain.generateAuthToken();
    // Set the token in the cookie
    res.cookie("token", token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
    });
    // Send the response
    res.status(200).json({ captain, token });
};


// 3. Get Captain - GET Request - /api/v1/captains/getCaptain
const getCaptain = async (req, res, next) => {
    // Get the captain from the request
    const captain = req.captain;
    // Send the response
    res.status(200).json({ captain });
}

// 4. Logout a captain - GET Request - /api/v1/captains/logout
const logoutCaptain = async (req, res, next) => {
    // Clear the token in the cookie
    res.clearCookie("token");
    // Add the token to the blacklist
    const token = req.token;
    await blacklistTokenModel.create({ token });
    // Send the response
    res.status(200).json({ message: "Captain logged out successfully" });
}

/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ********End of all functions for the Captain Controller ********
--------------------------------------------------------------------------------------------------------------------------------------
*/

// Export the captain controller
module.exports = { registerCaptain, loginCaptain, getCaptain, logoutCaptain }
