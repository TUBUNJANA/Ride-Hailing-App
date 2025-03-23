/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: user.model.js
 * Description: User model schema for the database.
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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ********************************************************************************************************************
// ********************************************************************************************************************



// User Schema 
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [4, "At least 4 characters required"],
            maxlength: [64, "At most 64 characters allowed"],
        },
        lastname: {
            type: String,
            minlength: [4, "At least 4 characters required"],
            maxlength: [64, "At most 64 characters allowed"],
            required: true
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [5, "At least 5 characters required"],
        maxlength: [64, "At most 64 characters allowed"],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "At least 8 characters required"],
        maxlength: [64, "At most 64 characters allowed"],
        select: false
    },
    socketId: {
        type: String,
    }
},
    {
        timestamps: true
    }
);


// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
    return token;
}

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
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
                            ******** END OF THE AUTH USER MODEL ********
--------------------------------------------------------------------------------------------------------------------------------------
*/

// Create user model
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;