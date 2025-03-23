/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: app.js
 * Description: This file handles all routes for all the requests to the API (Backend).
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


// Initialize the Express Server, Connect to the Database, and Define the Routes for the API (Backend).
// --------------------------------------------------------------------------------------------------------------------------
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const userRouter = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')
const cookieParser = require('cookie-parser');



// ********************************************************************************************************************
// Configure the middleware and routes for the all the requests to the API (Backend).
// ********************************************************************************************************************


// Connect to the database
connectDB();

// --------------------------------------------------------------------------------------------------------------------------------------


// Middleware for the API (Backend) to accept JSON data and CORS requests from the frontend application.
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------------------------------------------------------------------------------------------



// ********************************************************************************************************************
// Home Route for the API (Backend) to check if the server is running.
app.get('/', (req, res) => { res.send('Hello World'); });
// User Routes for the API (Backend) to handle user requests.
app.use('/api/v1/users', userRouter);
// Captain Routes for the API (Backend) to handle captain requests.
app.use('/api/v1/captains', captainRouter);
// Map Routes for the API (Backend) to handle map requests.
app.use('/api/v1/maps', mapsRoutes);
// Ride Routes for the API (Backend) to handle ride requests.
app.use('/api/v1/rides', rideRoutes);



// ********************************************************************************************************************
// Export the app
module.exports = app;