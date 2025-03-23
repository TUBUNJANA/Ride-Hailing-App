import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FinishRide(props) {
  const token = localStorage.getItem("token");
  const nevigat = useNavigate();

  const finishRideHandller = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: props?.ride?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Ride finished successfully!");
        props.setFinishRidePanel(false);
        nevigat("/captain-home");
      } else {
        alert("Failed to finish the ride. Please try again.");
      }
    } catch (error) {
      console.error("Error finishing the ride:", error);
      alert("An error occurred while finishing the ride.");
    }
  };

  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={(e) => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl  text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h2 className="text-2xl font-semibold mb-5">Finish this Ride</h2>
      <div className="flex items-center justify-between p-2 bg-gray-300 rounded-lg mt-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props?.ride?.user?.fullname?.firstname}{" "}
            {props?.ride?.user?.fullname?.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex justify-between items-center flex-col gap-3">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-checkbox-blank-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Third Wave Coffee</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props?.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <button
            onClick={finishRideHandller}
            className="mt-5 flex justify-center w-full text-lg bg-green-600 text-white font-semibold p-2 rounded-lg"
          >
            Finish Ride
          </button>
          <p className="mt-10  text-xs ">
            Click on finish ride button if you completed the payment.
          </p>
        </div>
      </div>
    </div>
  );
}
