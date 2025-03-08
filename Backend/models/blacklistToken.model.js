/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: blacklistToken.model.js
 * Description: This file create the blacklist token schema in the database.
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

// Importing mongoose in the blacklistToken.model.js file.
// ********************************************************************************************************************
const mongoose = require('mongoose');


// Blacklist Token Schema
// ********************************************************************************************************************
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // this will delete the document after 24 hours
    }
});

/*
--------------------------------------------------------------------------------------------------------------------------------------
                            ******** END OF THE AUTH BLACKLIST-TOKEN MODEL ********
--------------------------------------------------------------------------------------------------------------------------------------
*/

// Create a model for the blacklistTokenSchema
const blacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);
module.exports = blacklistTokenModel;