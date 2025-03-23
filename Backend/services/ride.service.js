/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: ride.service.js
 * Description: This file handle all the ride service works. 

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
const rideModel = require("../models/ride.model");
const mapsService = require('./maps.service');
const crypto = require('crypto');

/* --------------------------------------------------------------------------------------------------------------------------------------
                             ************ START OF RIDE SERVICE ************
 -----------------------------------------------------------------------------------------------------------------------------------------
*/

// User Service for creating a new user in the database.

const createRideService = async ({ user, pickup, destination, vehicleType }) => {
    // Validation check
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields (user, pickUp, destination, vehicleType) are required');
    }

    try {
        // Calculate fare based on pickup and destination
        const fare = await getFare(pickup, destination);
        // Create otp.
        const otp = await generateRandomNumber(6);
        // Create a new ride object
        const newRide = await rideModel.create({
            user,
            pickup,
            destination,
            otp,
            vehicleType,
            fare: fare[vehicleType],
        });

        return newRide;
    } catch (error) {
        console.log("Error in the createRideService function: ", error.message);
        throw new Error('Failed to create ride. Please try again later.');
    }

};


// Calculate fare function.
const getFare = async (pickup, destination) => {
    // Validation check.
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    try {
        console.log("source and destination : ", pickup, destination);
        const distanceTime = await mapsService.getDistanceTimeBwTwoPoint(pickup, destination);
        console.log("distanceTime : ", distanceTime)
        // Convert distance to numeric value
        const distanceInKm = distanceTime.distance.value / 1000; // Convert from meters to kilometers
        // Convert duration to minutes
        const durationInMinutes = distanceTime.duration.value / 60

        const baseFare = {
            auto: 10, // Base fare for auto
            car: 20,  // Base fare for car
            motorcycle: 5 // Base fare for motorcycle
        };

        const perKmRate = {
            auto: 8, // Rate per km for auto
            car: 15, // Rate per km for car
            motorcycle: 6 // Rate per km for motorcycle
        };

        const perMinuteRate = {
            auto: 1, // Rate per minute for auto
            car: 2,  // Rate per minute for car
            motorcycle: 0.5 // Rate per minute for motorcycle
        };

        const fare = {
            auto: Math.ceil(baseFare.auto + (distanceInKm * perKmRate.auto) + (durationInMinutes * perMinuteRate.auto)),
            car: Math.ceil(baseFare.car + (distanceInKm * perKmRate.car) + (durationInMinutes * perMinuteRate.car)),
            motorcycle: Math.ceil(baseFare.motorcycle + (distanceInKm * perKmRate.motorcycle) + (durationInMinutes * perMinuteRate.motorcycle))
        };

        return fare;

    } catch (error) {
        console.log("Error in the getFare function : ", error.message);
        throw new Error('Failed to calculate fare. Please try again later.');
    }
};


const generateRandomNumber = (length) => {
    // Generate a random number with the specified length
    const min = Math.pow(10, length - 1); // Minimum value with the specified number of digits
    const max = Math.pow(10, length) - 1; // Maximum value with the specified number of digits

    return crypto.randomInt(min, max + 1); // Generate a random integer between min and max
}


const confirmRideService = async ({ rideId, captain }) => {
    try {
        console.log("Inside confirmRideService :: ", rideId, captain);
        // Validation check
        if (!rideId || !captain) {
            throw new Error('Both rideId and captain are required');
        }
        // Find the ride by ID
        const ride = await rideModel.findById(rideId);
        if (!ride) {
            throw new Error('Ride not found');
        }

        // Check if the ride status is 'accepted'
        if (ride.status !== 'pending') {
            throw new Error('Ride cannot be started as it is not in the pending state');
        }

        // Check if a captain is already assigned
        if (ride.captain) {
            throw new Error('This ride has already been accepted by another captain');
        }

        // Update the ride status and assign the captain
        ride.status = 'accepted';
        ride.captain = captain;

        // Save the updated ride
        const updatedRide = await ride.save();

        return updatedRide;
    } catch (error) {
        console.log("Error in the confirmRideService function: ", error.message);
        throw new Error('Failed to confirm ride. Please try again later.');
    }
};


const startRideService = async ({ rideId, captainId, otp }) => {
    try {
        console.log("Inside startRideService :: ", rideId, captainId, otp);
        // Validation check
        if (!rideId || !captainId || !otp) {
            throw new Error('rideId, captainId, and otp are required');
        }

        // Find the ride by ID
        const ride = await rideModel.findById(rideId).select('otp pickup destination fare captain status');
        if (!ride) {
            throw new Error('Ride not found');
        }
        console.log("Ride object data", ride);
        console.log("Ride id from db and frontend :: ", ride.captain, captainId);
        // Check if the ride is assigned to the captain
        if (!ride.captain.equals(captainId)) {
            throw new Error('This ride is not assigned to the provided captain');
        }

        // Check if the ride status is 'accepted'
        if (ride.status !== 'accepted') {
            throw new Error('Ride cannot be started as it is not in the accepted state');
        }

        // Verify the OTP
        if (ride.otp !== otp) {
            throw new Error('Invalid OTP');
        }

        // Update the ride status to 'in-progress'
        ride.status = 'ongoing';

        // Save the updated ride
        const updatedRide = await ride.save();

        return updatedRide;
    } catch (error) {
        console.log("Error in the startRideService function: ", error.message);
        throw new Error('Failed to start ride. Please try again later.');
    }
};


const endRideService = async ({ rideId, captainId }) => {
    try {
        console.log("Inside endRideService :: ", rideId, captainId);
        // Validation check
        if (!rideId || !captainId) {
            throw new Error('rideId and captainId are required');
        }

        // Find the ride by ID
        const ride = await rideModel.findById(rideId).select('captain status fare');
        if (!ride) {
            throw new Error('Ride not found');
        }

        // Check if the ride is assigned to the captain
        if (!ride.captain.equals(captainId)) {
            throw new Error('This ride is not assigned to the provided captain');
        }

        // Check if the ride status is 'ongoing'
        if (ride.status !== 'ongoing') {
            throw new Error('Ride cannot be ended as it is not in the ongoing state');
        }

        // Update the ride status to 'completed'
        ride.status = 'completed';

        // Save the updated ride
        const updatedRide = await ride.save();

        return updatedRide;
    } catch (error) {
        console.log("Error in the endRideService function: ", error.message);
        throw new Error('Failed to end ride. Please try again later.');
    }
};

/* --------------------------------------------------------------------------------------------------------------------------------------
                             ************ END OF RIDE SERVICE ************
 -----------------------------------------------------------------------------------------------------------------------------------------
*/


// Export the user service
module.exports = { createRideService, getFare, generateRandomNumber, confirmRideService, startRideService, endRideService }