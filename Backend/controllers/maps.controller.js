/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: captain.controller.js
 * Description: This file handle  all the map requeat. 
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
 * - [Add any important notes for this file (e.g., potential issues, things to revisit, etc.)]
 * 
 * Copyright (c) [Company Name], [Year]. All rights reserved.
--------------------------------------------------------------------------------------------------------------------------------------
 */


// --------------------------------------------------------------------------------------------------------------------------------------

// Importing all teh required modules to create the map controller.
const { getAddressCoordinate, getDistanceTimeBwTwoPoint, getAddressSuggestionService } = require('../services/maps.service'); // Import the map service function
const { validationResult } = require('express-validator');

/*
--------------------------------------------------------------------------------------------------------------------------------------
                ******* All functions for the Map Controller ********
                1. getCoordinate Controller for get the coordinate of a address.
                2. getDistanceTime Controller will help to calculate the distance and the time b/w two coordinate.
                3. getSuggestion Controller is used to get the suggestion on address type by a authorized user to help autocomplete feature.
                4. 
--------------------------------------------------------------------------------------------------------------------------------------
*/


// 1. To get the coordinate this funcion will help.
const getCoordinate = async (req, res, next) => {
    // Check the validation on the incoming data.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Get the address from the request.
    const { address } = req.query;
    try {
        // Get the data from the google map.
        const coordinates = await getAddressCoordinate(address);
        // If cordinate founded then return the response.
        res.status(200).json(coordinates);
    }
    catch (error) {
        console.log(error)
        // If any error occure during the API call then handle here.
        res.status(404).json({ message: 'Coordinate not found' });
    }
};

// 2. Get the distance and the time of two coordinate.
const getDistanceTime = async (req, res, next) => {
    // Check the validation on the incoming data.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Get the address from the request.
    const { origin, destination } = req.query;
    try {
        // Get the data from the google map.
        const distanceAndTime = await getDistanceTimeBwTwoPoint(origin, destination);
        // If cordinate founded then return the response.
        res.status(200).json(distanceAndTime);
    } catch (error) {
        console.log(error)
        // If any error occure during the API call then handle here.
        res.status(404).json({ message: 'Distance and time not found' });
    }
}

// 3. Suggestion controller for the address suggestion.
const getAutoCompleteSuggestions = async (req, res, next) => {
    // Check the validation on the incoming data.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Get the address from the request.
    const { input } = req.query;
    try {
        // Get the data from the google map.
        const distanceAndTime = await getAddressSuggestionService(input);
        // If suggestion founded then return the response.
        res.status(200).json(distanceAndTime);
    } catch (error) {
        console.log(error)
        // If any error occure during the API call then handle here.
        res.status(404).json({ message: 'Suggestion not found' });
    }
}

/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ********End of all functions for the map Controller ********
--------------------------------------------------------------------------------------------------------------------------------------
*/

// Export the map controller
module.exports = { getCoordinate, getDistanceTime, getAutoCompleteSuggestions }
