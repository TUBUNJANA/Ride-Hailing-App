/*
--------------------------------------------------------------------------------------------------------------------------------------
                                            INSTRUCTIONS
 * Project Name: Uber App
 * File Name: socket.js
 * Description: Initializes the Socket.io instance using the provided HTTP server.
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


// Importing the required modules for socket communication and database models.
const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io; // Variable to store the Socket.io instance

/**
 * Initializes the Socket.io instance using the provided HTTP server.
 * Configures CORS to allow all origins and GET/POST methods.
 * Registers event listeners for client connection, joining, updating location, and disconnect events.
 *
 * @param {http.Server} server - The HTTP server to attach Socket.io to.
 */
function initializeSocket(server) {
    // Create a new Socket.io instance, attaching it to the HTTP server.
    io = socketIo(server, {
        cors: {
            origin: '*', // Allow all origins
            methods: ['GET', 'POST'] // Allow GET and POST methods
        }
    });

    // Listen for incoming socket connections.
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        /**
         * Event listener for 'join' event.
         * This event is used by clients to associate their userId and userType with the current socket connection.
         * The user's document is then updated with the current socketId.
         *
         * Expected data format: { userId, userType }
         */
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            // Update the corresponding model with the socket id based on the userType.
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            console.log("Client socket id updated.");
        });

        /**
         * Event listener for 'update-location-captain' event.
         * This event allows a captain to update their current location.
         * The location data must include 'ltd' (latitude) and 'lng' (longitude).
         *
         * Expected data format: { userId, location: { ltd, lng } }
         */
        socket.on('update-location-captain', async (data) => {
            console.log("Location updated success.");
            const { userId, location } = data;

            // Validate that location data is provided and has both latitude and longitude.
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            // Update the captain's location in the database.
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    lat: location.ltd,
                    lng: location.lng
                }
            });
        });

        /**
         * Event listener for 'confirm-ride' event.
         * This event allows a captain to confirm a ride.
         * The ride data must include 'rideId' and 'status'.
         *
         * Expected data format: { rideId, status }
         */
        socket.on('confirm-ride', async (data) => {
            const { rideId, captainId } = data;

            // Validate that rideId and status are provided.
            if (!rideId || !captainId) {
                return socket.emit('error', { message: 'Invalid ride data' });
            }

            try {
                // Update the ride status in the database.
                await captainModel.updateOne(
                    { 'rides._id': rideId },
                    { $set: { 'rides.$.status': status } }
                );

                // Notify the client that the ride has been confirmed.
                socket.emit('ride-confirmed', { rideId, status });
                console.log(`Ride ${rideId} status updated to ${status}`);
            } catch (error) {
                console.error('Error updating ride status:', error);
                socket.emit('error', { message: 'Failed to update ride status' });
            }
        });

        /**
         * Event listener for 'update-location-user' event.
         * This event allows a user to update their current location.
         * The location data must include 'ltd' (latitude) and 'lng' (longitude).
         *
         * Expected data format: { userId, location: { ltd, lng } }
         */
        socket.on('update-location-user', async (data) => {
            const { userId, location } = data;
            // console.log("update-location-user endpoint called.");

            // Validate that location data is provided and has both latitude and longitude.
            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
            // console.log("Sending the user locaion to captain.", location);
            // Notify the specified socket id with the updated location.
            sendMessageToSocketId(data.socketId, { event: 'get-location-user', data: { location } })

        });

        /**
         * Event listener for 'update-location-captain' event.
         * This event allows a captain to update their current location and notifies users subscribed to the captain's updates.
         *
         * Expected data format: { userId, location: { ltd, lng } }
         */
        socket.on('update-location-captain', async (data) => {
            console.log("update-location-captain endpoint called.");
            const { captainId, location } = data;
            // Validate that location data is provided and has both latitude and longitude.
            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            try {
                // Notify users subscribed to this captain's updates about the new location.
                sendMessageToSocketId(data.socketId, { event: 'get-location-captain', data: { location } })
            } catch (error) {
                console.error('Error updating captain location:', error);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });

        /**
         * Event listener for socket disconnection.
         * Logs a message when a client disconnects.
         */
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

/**
 * Sends a message to a specific socket id.
 *
 * @param {string} socketId - The ID of the socket to send the message to.
 * @param {Object} messageObject - An object containing the event name and data.
 *
 * Example messageObject:
 * {
 *    event: 'rideUpdate',
 *    data: { status: 'driver on way' }
 * }
 */
const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);

    // Check if the Socket.io instance is initialized, then send the message.
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

// Export the socket functions so that they can be used in other parts of the application.
module.exports = { initializeSocket, sendMessageToSocketId };