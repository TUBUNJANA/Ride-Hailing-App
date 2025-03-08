/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: captain.routes.js
 * Description: This file create the captain schema in the database.
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



// Importing required modules and libraries in the captain.model.js file
// ********************************************************************************************************************

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// ********************************************************************************************************************
// Create a schema for the captain collection in the database.
// ********************************************************************************************************************

const captainSchema = new mongoose.Schema({
    // Define the fields in the captain collection
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [4, "First Name must be at least 4 characters long"]
        },
        lastname: {
            type: String,
            required: true,
            minlength: [4, "Last Name must be at least 4 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Invalid Email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
},
    {
        timestamps: true
    }
);

// Generate JWT token for the captain user.
captainSchema.methods.generateAuthToken = function () {
    // Generate a JWT token with the user ID and secret key
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
    return token;
}

// Compare the password of the captain user.
captainSchema.methods.comparePassword = async function (password) {
    // Compare the entered password with the password in the database
    return await bcrypt.compare(password, this.password);
}

// Hash the password before saving the user in the database.
captainSchema.pre('save', async function (next) {
    try {
        // Only hash password if it is modified or is a new user
        if (!this.isModified("password")) {
            return next();
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        return next();
    } catch (err) {
        return next(err); // Pass the error to the next middleware (error handling)
    }
});

/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ******** END OF THE AUTH CAPTAIN MODEL ********
--------------------------------------------------------------------------------------------------------------------------------------
*/

// Export the model
const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;
// ********************************************************************************************************************