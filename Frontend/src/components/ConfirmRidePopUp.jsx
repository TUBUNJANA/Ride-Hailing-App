import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmRidePopUp(props) {
  const [otp, setOtp] = useState("");
  const token = localStorage.getItem("token");
  const nevigat = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          rideId: props?.rides?._id,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Ride started successfully!");
        props.setConfirmRidePopUpPanel(false);
        // Redirect or perform additional actions if needed
        nevigat("/captain-riding", { state: { ride: props.rides } });
      } else {
        alert(response.data.message || "Failed to start the ride.");
      }
    } catch (error) {
      console.error("Error starting the ride:", error);
      alert("An error occurred while starting the ride. Please try again.");
    }
  };

  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={(e) => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl  text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h2 className="text-2xl font-semibold mb-5">
        Comfirm this Ride to Start
      </h2>
      <div className="flex items-center justify-between p-2 bg-gray-300 rounded-lg mt-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props?.rides?.user?.fullname?.firstname || ""}{" "}
            {props?.rides?.user?.fullname?.lastname || ""}
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
                {props?.rides?.pickup || ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-checkbox-blank-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Third Wave Coffee</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.rides?.destination || ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{props?.rides?.fare || ""}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-4"
              type="number"
              placeholder="Enter OTP"
            />
            <button
              type="submit"
              className="mt-5 flex justify-center text-lg w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={(e) => {
                props.setRidePopUpPanel(false);
                props.setConfirmRidePopUpPanel(false);
              }}
              className="mt-1 w-full text-lg text-white bg-red-500 font-semibold p-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
