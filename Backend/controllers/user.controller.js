/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: user.controller.js
 * Description: User Controller for the API (Backend). 
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


// Import the required modules
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require('express-validator');
const blacklistTokenModel = require("../models/blacklistToken.model");

// ********************************************************************************************************************
// userController: User Controller for the API (Backend)
// ********************************************************************************************************************

// Register a new user - POST Request  -  /api/v1/users/register
const registerUser = async (req, res, next) => {
    // Validate the request
    const errors = validationResult(req);
    // If there are errors in the request, return the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Destructure the request
    const { email, fullname, password } = req.body;
    // Check if the user already exists
    const userExists = await userModel.findOne({ email });
    // If the user already exists, return an error
    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }
    const { firstname, lastname } = fullname;
    // Create a new user
    const user = await userService.createUser({ firstname, lastname, email, password });
    // Remove the password from the response
    user.password = undefined;
    // Generate a token for the user
    const token = await user.generateAuthToken();
    // Send the response
    res.status(201).json({ user, token });

}

// Login a user - POST Request  -  /api/v1/users/login
const loginUser = async (req, res, next) => {
    // Validate the request
    const errors = validationResult(req);
    // If there are errors in the request, return the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request
    const { email, password } = req.body;
    // Find a user by email and password
    const user = await userModel.findOne({ email }).select("+password");

    // If the user is not found, return an error
    if (!user) {
        return res.status(401).json({ error: "Invalid Email or Password" });
    }
    // Compare the password
    const isMatch = await user.comparePassword(password);
    // If the password does not match, return an error
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid Email or Password" });
    }
    // Remove the password from the response
    user.password = undefined;
    // Generate a token for the user
    const token = await user.generateAuthToken();
    // Set the token in the cookie
    res.cookie("token", token, {
        // httpOnly: true, // The cookie is only accessible by the server
        // secure: process.env.NODE_ENV === "production", // The cookie is only sent over HTTPS
    });
    // Send the response
    res.status(200).json({ user, token });
}

// Get a User Profile - GET Request  -  /api/v1/users/profile
const getProfile = async (req, res, next) => {
    // return the user profile from the request object (req)
    res.status(200).json({ user: req.user });

}

// Logout a user - GET Request  -  /api/v1/users/logout
const logoutUser = async (req, res, next) => {
    // Clear the token in the cookie
    res.clearCookie("token");
    const token = req.token;
    // Remove the token from the user
    await blacklistTokenModel.create({ token });
    // Send the response
    res.status(200).json({ message: "User logged out" });
}


/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ********End of all functions for the User Controller ********
--------------------------------------------------------------------------------------------------------------------------------------
*/


// Export the userController
module.exports = { registerUser, loginUser, getProfile, logoutUser }