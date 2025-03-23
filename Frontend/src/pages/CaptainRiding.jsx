import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

export default function CaptainRiding() {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const { state } = useLocation();
  console.log("The ride data in the captain riding is ::", state?.ride);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
          duration: 0.5, // Smooth animation with duration
          ease: "power3.out", // Adding easing for a smoother transition
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.in", // Smooth animation for closing
        });
      }
    },
    [finishRidePanel]
  );

  const handleCompleteRide = () => {
    setFinishRidePanel(true); // Show the finish ride panel
  };

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full z-20">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber logo"
        />
        <Link
          to="/captain/logout"
          className="h-10 w-10  bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5 relative">
        <div className="h-full">
          <LiveTracking role="captain" ride={state?.ride} />
        </div>

        <div className="h-1/5 p-6 bg-yellow-400 flex flex-col items-center justify-center relative">
          <h5 className="p-0 absolute top-0 cursor-pointer" onClick={() => {}}>
            <i className="text-3xl text-gray-800 ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="text-xl font-semibold">4 KM away</h4>
          <button
            className="bg-green-600 text-white font-semibold p-3 px-8 rounded-lg mt-4"
            onClick={handleCompleteRide} // Set the state to show finish ride panel
          >
            Finish Ride
          </button>
        </div>
      </div>

      {/* Finish Ride Panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full transform-y-full z-10 bottom-0 bg-white py-10 px-3 pt-12"
      >
        <FinishRide
          ride={state?.ride}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
}
