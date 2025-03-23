/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: maps.service.js
 * Description: This file creates the map service to interact with Google Maps API.
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

// Importing all the necessary librarys.
const axios = require("axios");
const captainModel = require("../models/captain.model");

// Google Maps API Key (replace with your actual API key)
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_API;

/* --------------------------------------------------------------------------------------------------------------------------------------
                             ************ START OF MAP SERVICE ************
 -----------------------------------------------------------------------------------------------------------------------------------------
*/

/**
 * Get the coordinates (latitude and longitude) for a given address.
 * @param {Object} params - The parameters object.
 * @param {string} params.address - The address to get coordinates for.
 * @returns {Object} - An object containing latitude and longitude.
 * @throws {Error} - Throws an error if the API call fails or the address is invalid.
 */

const getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error("Address is required.");
    }

    try {
        // Call the Google Maps Geocoding API
        const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address,
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        // Check if the response contains results
        if (response.data.status !== "OK" || response.data.results.length === 0) {
            throw new Error("Unable to fetch coordinates for the given address.");
        }

        // Extract latitude and longitude from the response
        const { lat, lng } = response.data.results[0].geometry.location;

        // Return the coordinates
        return { lat: lat, lng: lng };
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw new Error("Failed to fetch coordinates. Please try again later.");
    }
};

// Service function to calculate the distance and time b/w two point.
const getDistanceTimeBwTwoPoint = async (origin, destination) => {
    // If origin and destination is  not mention then throw the error.
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        // Call the Google Maps Distance Matrix API
        const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
            params: {
                origins: origin, // Starting point
                destinations: destination, // Ending point
                key: GOOGLE_MAPS_API_KEY, // Google Maps API Key
            },
        });

        // Check if the response doesn't contains results
        if (response.data.status !== "OK") {
            throw new Error("Unable to fetch distance and time  for the given address.");
        }
        // Check if the result contains valid elements
        const element = response.data.rows[0].elements[0];
        if (element.status === 'ZERO_RESULTS') {
            throw new Error('No results found for the given origin and destination.');
        }
        // Return the coordinates
        return element;

    } catch (error) {
        // Handle the exception if occure during the execution.
        console.error("Error fetching distance and time:", error.message);
        throw new Error("Failed to fetch distance and time. Please try again later.");
    }
}

// Suggestion route for the route suggestion.
const getAddressSuggestionService = async (input) => {
    // If inputis  not mention then throw the error.
    if (!input) {
        throw new Error('Address are required');
    }

    try {
        // Call the Google Maps Auto Complete API
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input: input,
                key: GOOGLE_MAPS_API_KEY, // Google Maps API Key
            },
        });
        // Check if the response doesn't contains results
        if (response.data.status !== "OK") {
            throw new Error("Unable to fetch suggestions.");
        }
        return response.data.predictions;

    } catch (error) {
        // Handle the exception if occure during the execution.
        console.error("Error fetching suggestions:", error.message);
        throw new Error("Failed to fetch suggestions. Please try again later.");
    }
}

/**
 * Finds captains within a specified radius of a given pickup location.
 *
 * @async
 * @function findCaptainInTheRadious
 * @param {Object} pickupLocation - The pickup location with latitude and longitude.
 * @param {number} pickupLocation.lat - The latitude of the pickup location.
 * @param {number} pickupLocation.lng - The longitude of the pickup location.
 * @param {number} radius - The radius (in kilometers) within which to search for captains.
 * @returns {Promise<Array>} A promise that resolves to an array of captains found within the specified radius.
 * @throws {Error} Throws an error if the pickup location or radius is not provided, 
 *                 if no captains are found, or if there is an issue with the database query.
 */
const findCaptainInTheRadious = async (pickupLocation, vehicleType, radius) => {
    if (!pickupLocation || !radius) {
        throw new Error("Pickup location and radius are required.");
    }

    try {
        // Assuming you have a Captain model and a database connection

        // Query the database to find captains within the radius
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[pickupLocation.lat, pickupLocation.lng], radius / 6371], // Radius in radians (Earth's radius in km)
                },
            },
            "vehicle.vehicleType": vehicleType,
            // isAvailable: true, // Assuming captains have an availability status
        });

        if (captains.length === 0) {
            throw new Error("No captains found within the specified radius.");
        }

        return captains;
    } catch (error) {
        console.error("Error finding captains:", error.message);
        throw new Error("Failed to find captains. Please try again later.");
    }
};


/* --------------------------------------------------------------------------------------------------------------------------------------
                             ************ END OF MAP SERVICE ************
 -----------------------------------------------------------------------------------------------------------------------------------------
*/

// Export the map service functions.
module.exports = { getAddressCoordinate, getDistanceTimeBwTwoPoint, getAddressSuggestionService, findCaptainInTheRadious };