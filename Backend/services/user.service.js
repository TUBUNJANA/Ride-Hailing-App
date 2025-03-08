/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: user.service.js
 * Description: This file create the user service. 
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


// Import the user model
const userModel = require("../models/user.model");


// ********************************************************************************************************************
// User Service for creating a new user in the database.
const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required.");
    } // Check if the user already exists

    // Check if the user already exists
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
}


// ********************************************************************************************************************
// ********************************************************************************************************************




// Export the userController
module.exports = {createUser}