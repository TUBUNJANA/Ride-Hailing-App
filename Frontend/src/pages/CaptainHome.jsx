import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { useSocket } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  // States for the rendering update.
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [rides, setRides] = useState(null);

  // useRef for the the pop up panel handling.
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const { sendEvent, onEvent, offEvent } = useSocket();
  const { captain } = useContext(CaptainDataContext);

  const token = localStorage.getItem("token");
  console.log("Captain data = ", captain);

  useEffect(() => {
    // Send an event
    sendEvent("join", { userId: captain._id, userType: "captain" });

    // Frequently sending the current location of the captain.
    const locationInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Sending the location update via socket
            try {
              sendEvent("update-location-captain", {
                userId: captain._id,
                location: { lat: latitude, lng: longitude },
              });
            } catch (socketError) {
              console.error(
                "Error sending location update via socket:",
                socketError
              );
              // You can show a message to the user, attempt a reconnection, etc.
            }
          },
          (geolocationError) => {
            // Handle geolocation errors (e.g., permission denied or failed to get location)
            console.error(
              "Error getting geolocation:",
              geolocationError.message
            );
            // You can show a message to the user asking to enable location permissions
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Optionally, alert the user to the lack of geolocation support.
      }
    }, 10000); // Update every 10 seconds

    const handleNewRide = (data) => {
      console.log("New ride received:", data);
      setRides(data);
      // Handle the new ride data here, e.g., update state or show a notification
      setRidePopUpPanel(true);
    };

    // Listen for the "new-ride" event
    onEvent("new-ride", handleNewRide);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(locationInterval);
      // Romove it if we want that the notificaion socket connection remain untill the captain gets logout.
      offEvent("new-ride");
    };
  }, []);

  const confirmRide = async () => {
    if (rides && rides._id) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
          {
            rideId: rides._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Ride confirmed successfully");
          setRidePopUpPanel(false);
        } else {
          console.error("Error confirming ride:", response.data.message);
        }
      } catch (error) {
        console.error(
          "Error confirming ride:",
          error.response?.data?.message || error.message
        );
      }
    } else {
      console.error("Ride ID is not available");
    }
  };

  // Function for the pop up panel.
  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );
  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt=""
        />
        <Link
          to="/captain/logout"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5 ">
        <div>
          <LiveTracking role="captain" />
        </div>
        <div className="h-2/5 p-6">
          <CaptainDetails />
        </div>
        <div
          ref={ridePopUpPanelRef}
          className="fixed w-full  transform-y-full  z-10 bottom-0 bg-white py-10 px-3 pt-12 "
        >
          <RidePopUp
            rides={rides}
            setRidePopUpPanel={setRidePopUpPanel}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            confirmRide={confirmRide}
          />
        </div>
        <div
          ref={confirmRidePopUpPanelRef}
          className="fixed w-full h-screen  transform-y-full  z-10 bottom-0 bg-white py-10 px-3 pt-12 "
        >
          <ConfirmRidePopUp
            rides={rides}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            setRidePopUpPanel={setRidePopUpPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
