/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: auth.middleware.js
 * Description: This file contains the middleware to check if the user is authenticated or not using JWT.
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


// Import the required modules and models for the middleware to check if the user is authenticated or not using JWT.
const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require("../models/blacklistToken.model");



/*
--------------------------------------------------------------------------------------------------------------------------------------
                    ******** MIDDLEWARE'S ********
                    1. authUser - Middleware to check if the user is authenticated or not using JWT.
                    2. authCaptain - Middleware to check if the captain is authenticated or not using JWT.
--------------------------------------------------------------------------------------------------------------------------------------
*/


// Middleware to check if the user is authenticated or not using JWT.
// This middleware will be used to protect the routes that require authentication.
const authUser = async (req, res, next) => {
    // Get the token from the request header
    const token = req?.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    // If the token is not found, return an error
    if (!token) {
        return res.status(401).json({ error: "Not authorized to access this resource" });
    }
    // Check if the token is blacklisted or not (logged out or expired)
    const isTokenBlacklisted = await blacklistTokenModel.findOne({
        token: token
    });
    // If the token is blacklisted, return an error
    if (isTokenBlacklisted) {
        return res.status(401).json({ error: "Not authorized to access this resource" });
    }
    try {
        // Verify the token
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by ID and token
        const user = await userModel.findOne({ _id: data.id });
        // If the user is not found, return an error
        if (!user) {
            return res.status(401).json({ error: "Not authorized to access this resource" });
        }
        // Set the user and token in the request
        req.user = user;
        req.token = token;
        // Call the next middleware
        console.log("User is authenticated");
        return next();
    }
    catch (e) {
        res.status(401).json({ error: "Not authorized to access this resource" });
    }
}


// Middleware to check if the captain is authenticated or not using JWT.
// This middleware will be used to protect the routes that require authentication.
const authCaptain = async (req, res, next) => {
    // Get the token from the request header
    const token = req?.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    // If the token is not found, return an error
    if (!token) {
        return res.status(401).json({ error: "Not authorized to access this resource" });
    }
    // Check if the token is blacklisted or not (logged out or expired)
    const isTokenBlacklisted = await blacklistTokenModel.findOne({
        token: token
    });
    // If the token is blacklisted, return an error
    if (isTokenBlacklisted) {
        return res.status(401).json({ error: "Not authorized to access this resource" });
    }
    try {
        // Verify the token
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // Find the captain by ID and token
        const captain = await captainModel.findOne({ _id: data.id });
        // If the captain is not found, return an error
        if (!captain) {
            return res.status(401).json({ error: "Not authorized to access this resource" });
        }
        // Set the captain and token in the request
        req.captain = captain;
        req.token = token;
        // Call the next middleware
        console.log("Captain is authenticated");
        return next();
    }
    catch (e) {
        res.status(401).json({ error: "Not authorized to access this resource" });
    }
};

/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ******** END OF THE AUTH MIDDLEWARE ********
--------------------------------------------------------------------------------------------------------------------------------------
*/

// Export the middleware
module.exports = { authUser, authCaptain };
