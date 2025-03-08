/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: db.js
 * Description: This file is used to connect to the MongoDB database.
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



// Import the mongoose module
const mongoose = require('mongoose');

// Connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        const conn = await mongoose.connect(process.env.DB_CONNECTION);
        // Log the connection host
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log the error message and exit the process with status code 1.
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

/* --------------------------------------------------------------------------------------------------------------------------------------
                                    * END OF FILE *         
 --------------------------------------------------------------------------------------------------------------------------------------
*/

// Export the connectDB function
module.exports = connectDB;