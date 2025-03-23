import React, { useState, useEffect, useContext } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useSocket } from "../context/SocketContext.jsx";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

export default function LiveTracking({ role, ride }) {
  const [userPosition, setUserPosition] = useState({ lat: 0, lng: 0 });
  const [captainPosition, setCaptainPosition] = useState({ lat: 0, lng: 0 });
  const { sendEvent, onEvent } = useSocket();
  const YOUR_GOOGLE_MAPS_API_KEY = import.meta.env.GOOGLE_MAP_API;
  const { captain } = useContext(CaptainDataContext);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };
  console.log("User position :: ", userPosition);
  console.log("Captain position :: ", captainPosition);
  console.log("Role :: ", ride);

  const updateLocation = (role) => {
    console.log("updateLocation :: ");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPos = { lat: latitude, lng: longitude };

          if (role === "user") {
            setUserPosition(newPos);
            if (ride?.user?._id) {
              sendEvent("update-location-user", {
                socketId: ride?.captain?.socketId,
                userId: ride?.user?._id,
                location: newPos,
              });
            }
          } else if (role === "captain") {
            console.log("Captain location update ::", ride);
            setCaptainPosition(newPos);
            if (captain?._id) {
              console.log("Captain location update.");
              sendEvent("update-location-captain", {
                socketId: ride?.user?.socketId,
                captainId: captain?._id,
                location: newPos,
              });
            }
          }
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    updateLocation(role);

    const locationInterval = setInterval(() => {
      updateLocation(role);
    }, 10000);

    onEvent("get-location-user", (data) => {
      console.log("Get the user location :: ", data);
      setUserPosition(data.location);
    });

    onEvent("get-location-captain", (data) => {
      console.log("Get the captain location :: ", data);
      setCaptainPosition(data.location);
    });

    return () => clearInterval(locationInterval);
  }, [sendEvent, onEvent]);

  return (
    <div>
      <LoadScript googleMapsApiKey={YOUR_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={
            captainPosition.lat !== 0 && captainPosition.lng !== 0
              ? captainPosition
              : userPosition
          }
          zoom={20}
        >
          {userPosition.lat !== 0 && userPosition.lng !== 0 && (
            <Marker position={userPosition} label="User" />
          )}
          {captainPosition.lat !== 0 && captainPosition.lng !== 0 && (
            <Marker position={captainPosition} label="Captain" />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
