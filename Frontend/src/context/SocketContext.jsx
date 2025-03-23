import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context for Socket.io
const SocketContext = createContext();

// URL of the Socket.io server (adjust as necessary)
const SERVER_URL = import.meta.env.VITE_BASE_URL_SOCKET;

// SocketContextProvider component to wrap your app and provide socket functionalities
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectSocket = async () => {
      // Initialize the socket connection
      const socketIo = await io(SERVER_URL, {
        transports: ["websocket"],
        autoConnect: true,
      });

      // Listen for connection
      socketIo.on("connect", () => {
        console.log("Socket connected with id:", socketIo.id);
      });

      // Listen for disconnection
      socketIo.on("disconnect", () => {
        console.log("Socket disconnected by server.");
      });

      // Save socket instance in state
      setSocket(socketIo);
    };

    connectSocket();

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected during cleanup");
      }
    };
  }, []); // Empty dependency array to run only on mount/unmount

  /**
   * Function to send a message to a specific event.
   *
   * @param {string} eventName - The event name to emit.
   * @param {any} data - The data to send along with the event.
   */
  const sendEvent = (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
      console.log(`Message sent on event "${eventName}":`, data);
    } else {
      console.error("Socket not connected yet");
    }
  };

  /**
   * Function to subscribe to a specific event.
   *
   * @param {string} eventName - The event name to listen for.
   * @param {Function} callback - The callback function to handle the event data.
   */
  const onEvent = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback);
      console.log(`Subscribed to event "${eventName}"`);
    } else {
      console.error("Socket not connected yet");
    }
  };

  /**
   * Function to unsubscribe from a specific event.
   *
   * @param {string} eventName - The event name to stop listening for.
   */
  const offEvent = (eventName) => {
    if (socket) {
      socket.off(eventName);
      console.log(`Unsubscribed from event "${eventName}"`);
    } else {
      console.error("Socket not connected yet");
    }
  };

  // Provide the socket instance and both functions to the consuming components
  return (
    <SocketContext.Provider
      value={{
        socket,
        sendEvent,
        onEvent,
        offEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the SocketContext
export const useSocket = () => useContext(SocketContext);
