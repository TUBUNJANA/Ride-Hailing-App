/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: server.js
 * Description: This file is the entry point of the application. And it start the server.
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
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;


// Create a server and listen to the port 3000 or the port defined in the environment variable.
const server = http.createServer(app);


// Listen to the server on the port 3000 or the port defined in the environment variable.
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

// --------------------------------------------------------------------------------------------------------------------------------------
// ********************************************************************************************************************