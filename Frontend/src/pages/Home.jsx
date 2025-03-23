import { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmdRide from "../components/ConfirmdRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useSocket } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const { sendEvent, offEvent, onEvent } = useSocket();

  // Input fields, suggestion list, and active field indicator
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(""); // "pickup" or "destination"

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanal, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [vehicleType, setVehicleType] = useState("car");
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [confirmRideData, setConfirmRideData] = useState(null);
  const [fare, setFare] = useState({ auto: 0, motorcycle: 0, car: 0 });

  const panelRef = useRef(null);
  const vehiclePanalRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const token = localStorage.getItem("token");
  const nevigat = useNavigate();
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    // Send an event only if not already joined
    sendEvent("join", { userId: user._id, userType: "user" });

    // Listen for ride events
    const handleRideConfirmed = (data) => {
      console.log("Ride confirmed:", data);
      setConfirmRideData(data);
      setVehicleFound(false);
      setWaitingForDriver(true);
    };

    const handleRideStarted = (data) => {
      console.log("Ride started:", data);
      setWaitingForDriver(false);
      nevigat("/riding", { state: { ride: data } });
    };

    onEvent("ride-confirmed", handleRideConfirmed);
    onEvent("ride-started", handleRideStarted);

    // Cleanup event listeners
    return () => {
      offEvent("ride-confirmed", handleRideConfirmed);
      offEvent("ride-started", handleRideStarted);
    };
  }, [sendEvent, onEvent, offEvent, user._id, nevigat]);

  // Panel animations using GSAP
  useEffect(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        height: panelOpen ? "70%" : "0%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanal) {
      gsap.to(vehiclePanalRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(vehiclePanalRef.current, { transform: "translateY(100%)" });
    }
  }, [vehiclePanal]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(confirmRidePanelRef.current, { transform: "translateY(100%)" });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(vehicleFoundRef.current, { transform: "translateY(100%)" });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(100%)" });
    }
  }, [waitingForDriver]);

  // Fetch suggestions when typing
  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Suggestion res : ", response);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField("pickup");
    fetchSuggestions(value);
    setPanelOpen(true);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField("destination");
    fetchSuggestions(value);
    setPanelOpen(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    setSuggestions([]);
  };

  const fetchFare = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFare(response.data);
      setPanelOpen(false);
      setVehiclePanel(true);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pickup && destination) {
      await fetchFare();
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Ride created successfully:", response.data);
      setConfirmRidePanel(false);
      setVehicleFound(true);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
      />

      {/* Logout Link */}
      <Link
        to="/user/logout"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg z-20"
      >
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>

      {/* Live Tracking */}
      <div className="h-screen w-screen">
        <div className="h-full w-full">
          <LiveTracking role="user" />
        </div>
      </div>

      {/* Trip Finding Panel */}
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%] p-3 bg-white relative">
          <h5
            className="absolute right-2 top-3 text-2xl"
            onClick={() => setPanelOpen((prev) => !prev)}
          >
            {panelOpen ? <i className="ri-arrow-down-wide-line"></i> : null}
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="line absolute h-16 w-1 top-[28%] bg-gray-700 left-10"></div>
            <input
              onClick={() => {
                setActiveField("pickup");
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setActiveField("destination");
                setPanelOpen(true);
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg mt-4"
            >
              Find Ride
            </button>
          </form>
        </div>

        {/* Animated Suggestion Panel */}
        <div
          ref={panelRef}
          className="p-4 bg-white overflow-auto"
          style={{ height: panelOpen ? "70%" : "0%" }}
        >
          <LocationSearchPanel
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanalRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white py-10 px-3 pt-12"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setPanelOpen={setPanelOpen}
          setVehicleType={setVehicleType}
          fare={fare}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white py-6 px-3 pt-12"
      >
        <ConfirmdRide
          setVehiclePanel={setVehiclePanel}
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
          createRide={createRide}
          fare={fare}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
        />
      </div>

      {/* Vehicle Found Panel */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white py-6 px-3 pt-12"
      >
        <LookingForDriver
          pickup={pickup}
          fare={fare}
          destination={destination}
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
          vehicleType={vehicleType}
        />
      </div>

      {/* Waiting for Driver Panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white py-6 px-3 pt-12"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          confirmRideData={confirmRideData}
        />
      </div>
    </div>
  );
};

export default Home;
