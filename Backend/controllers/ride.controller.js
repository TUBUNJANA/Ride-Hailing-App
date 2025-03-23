/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: ride.controller.js
 * Description: Ride Controller for the API (Backend). 
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
const rideModel = require("../models/ride.model");
const { findCaptainInTheRadious, getAddressCoordinate } = require("../services/maps.service");
const rideService = require("../services/ride.service");
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require("../socket");

// ********************************************************************************************************************
// userController: Ride Controller for the API (Backend)
// ********************************************************************************************************************



const createRide = async (req, res, next) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure the request body
        const { pickup, destination, vehicleType } = req.body;

        // Save the ride to the database
        const newRide = await rideService.createRideService({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        // Send the response
        res.status(201).json(newRide);

        // Now, process the coordinates and find the captains
        try {
            const pickupCoordinates = await getAddressCoordinate(pickup);
            console.log("PickUp coordinate is :: ", pickupCoordinates);
            const captainInRange = await findCaptainInTheRadious(pickupCoordinates, vehicleType, 3);
            console.log("Available captains:", captainInRange);
            // Notify all available captains
            const rideDetailsWithUser = await rideModel.findOne({ _id: newRide._id }).populate('user', 'fullname email socketId').select({ otp: 0 });
            captainInRange.forEach((captain) => {
                try {
                    sendMessageToSocketId(captain.socketId, { event: 'new-ride', data: rideDetailsWithUser })

                } catch (notificationError) {
                    console.error(`Failed to notify captain ${captain._id}:`, notificationError);
                }
            });
        } catch (error) {
            // Handle any errors that occur after the response is sent
            console.error("Error during captain lookup after response:", error);
            // You may want to log the error or take action (like sending an alert)
        }

    } catch (error) {
        // Handle any errors that occur before sending the response
        console.error("Error in createRide:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};


const calculateFare = async (req, res, next) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure the request body
        const { pickup, destination } = req.query;
        console.log("pickup, destination : ", pickup, destination);
        // Calculate the fare using the ride service
        const fare = await rideService.getFare(pickup, destination);

        // Send the response
        res.status(200).json(fare);
    } catch (error) {
        // Handle errors
        console.error("Error in calculateFare:", error);
    }
};


const confirmRide = async (req, res, next) => {
    console.log("Inside confirmRide");
    try {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure the request body
        const { rideId } = req.body;

        // Confirm the ride using the ride service
        const confirmedRide = await rideService.confirmRideService({ rideId, captain: req.captain._id });

        // Notify the user about the confirmation
        const rideDetailsWithCaptain = await rideModel.findOne({ _id: rideId })
            .populate('captain', 'fullname email vehicle').populate('user', 'socketId').select('otp pickup destination fare ');
        sendMessageToSocketId(rideDetailsWithCaptain.user.socketId, { event: 'ride-confirmed', data: rideDetailsWithCaptain });

        // Send the response
        console.log("Inside confirmRide response sending  ");
        res.status(200).json(confirmedRide);
    } catch (error) {
        // Handle errors
        console.error("Error in confirmRide:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};

const startRide = async (req, res, next) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure the request body
        const { rideId, otp } = req.body;

        // Start the ride using the ride service
        await rideService.startRideService({ rideId, captainId: req.captain._id, otp });

        // Notify the user about the ride start
        const rideDetailsWithCaptain = await rideModel.findOne({ _id: rideId })
            .populate('captain', 'fullname email vehicle socketId').populate('user', 'socketId').select('pickup destination fare status');
        sendMessageToSocketId(rideDetailsWithCaptain.user.socketId, { event: 'ride-started', data: rideDetailsWithCaptain });

        // Send the response
        res.status(200).json(rideDetailsWithCaptain);
    } catch (error) {
        // Handle errors
        console.error("Error in startRide:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};


const endRide = async (req, res, next) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure the request body
        const { rideId } = req.body;

        // End the ride using the ride service
        const endedRide = await rideService.endRideService({ rideId, captainId: req.captain._id });

        // Notify the user about the ride end
        const rideDetailsWithCaptain = await rideModel.findOne({ _id: rideId })
            .populate('captain', 'fullname email vehicle').populate('user', 'socketId').select('pickup destination fare status');
        sendMessageToSocketId(rideDetailsWithCaptain.user.socketId, { event: 'ride-ended', data: rideDetailsWithCaptain });

        // Send the response
        res.status(200).json(endedRide);
    } catch (error) {
        // Handle errors
        console.error("Error in endRide:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};

/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ********End of all functions for the Ride Controller ********
--------------------------------------------------------------------------------------------------------------------------------------
*/


// Export the userController
module.exports = { createRide, calculateFare, confirmRide, startRide, endRide }