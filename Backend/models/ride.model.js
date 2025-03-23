/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: user.model.js
 * Description: Ride model schema for the database.
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
const mongoose = require("mongoose");



/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ******** START OF THE RIDE MODEL ********
--------------------------------------------------------------------------------------------------------------------------------------
*/



// Ride Schema 
const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
    },
    duration: {
        type: Number,
    }, // in seconds.
    distance: {
        type: Number,
    }, // in meters.
    paymentID: {
        type: String,
    },
    orderID: {
        type: String,
    },
    signature: {
        type: String
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle', 'auto']
    },
    otp: {
        type: String,
        select: false,
        required: true,
    },
},
    {
        timestamps: true
    }
);


/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ******** END OF THE RIDE MODEL ********
--------------------------------------------------------------------------------------------------------------------------------------
*/

// Create user model
const rideModel = mongoose.model("Ride", rideSchema);
module.exports = rideModel;