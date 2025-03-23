/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: maps.routes.js
 * Description: This file handles the routes for the maps service.
 * 
 * Developer: Tubun Jana
 * Position: Software Developer
 * Company: -----------------
 * Date Created: 18/03/2025
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
 * - Ensure you have a valid Google Maps API key.
 * - Install axios using `npm install axios` before using this service.
 * 
 * Copyright (c) [Company Name], [Year]. All rights reserved.
--------------------------------------------------------------------------------------------------------------------------------------
 */

// Import the required modules
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
const { query } = require('express-validator');


/**
 * Route to get coordinates for a given address.
 * POST Request - /api/v1/maps/coordinates
 * 
 * Description:
 * - This route accepts an address in the request body.
 * - It uses the `getAddressCoordinate` function from the maps service to fetch the latitude and longitude.
 * - Returns the coordinates as a JSON response.
 * 
 * Request Body:
 * - `address` (string): The address for which coordinates are required.
 * 
 * Response:
 * - Success (200): Returns an object containing `latitude` and `longitude`.
 * - Error (400): If the address is missing in the request body.
 * - Error (500): If there is an issue with the Google Maps API or the service.
 */


/* --------------------------------------------------------------------------------------------------------------------------------------
                             ************ START OF MAP ROUTES ************
 -----------------------------------------------------------------------------------------------------------------------------------------
*/

// Route for get the longitude and latitute of the address by the google API.
router.get('/get-coordinates', query('address').isString().isLength({ min: 3 }), authMiddleware.authUser, mapController.getCoordinate);

// Route for get the distance and time by the google API.
router.get('/get-distance-time', query('origin').isString().isLength({ min: 3 }), query('destination').isString().isLength({ min: 3 }), authMiddleware.authUser, mapController.getDistanceTime);

// Location suggestion route.
router.get('/get-suggestion', query('input').isString().isLength({ min: 3 }), authMiddleware.authUser, mapController.getAutoCompleteSuggestions);

/* --------------------------------------------------------------------------------------------------------------------------------------
                             ************ END OF MAP ROUTES ************
 -----------------------------------------------------------------------------------------------------------------------------------------
*/



// Export the router to be used in the main application
module.exports = router;