/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: captain.service.js
 * Description: This file create the captain service.
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

// Import all teh required modules to create the captain service.
// ********************************************************************************************************************
const Captain = require('../models/captain.model');



// --------------------------------------------------------------------------------------------------------------------------------------
/*
                       ******* All functions for the Captain Service ********
*/
// --------------------------------------------------------------------------------------------------------------------------------------


// Creating a create captain function to create a new captain in the database.
const createCaptainService = async ({ firstname, lastname, email, password, color, plate, vehicleType, capacity }) => {
    // Check if the captain already exists
    if (!firstname || !firstname || !email || !password || !color || !plate || !vehicleType || !capacity) {
        throw new Error("All fields are required.");
    }
    // Create a new captain
    const captain = await Captain.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });
    // Return the captain
    return captain;
}

/* --------------------------------------------------------------------------------------------------------------------------------------
                             ************ END OF CAPTAIN SERVICE ************
 -----------------------------------------------------------------------------------------------------------------------------------------
*/
// Export the captain service
module.exports = { createCaptainService }