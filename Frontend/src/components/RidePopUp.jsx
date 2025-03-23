import React from "react";

export default function RidePopUp(props) {
  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={(e) => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl  text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h2 className="text-2xl font-semibold mb-5">New Ride Available!</h2>
      <div className="flex items-center justify-between p-2 bg-gray-300 rounded-lg mt-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props?.rides?.user?.fullname?.firstname || ""}
            {"  "}
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
                {props?.rides?.fare || ""}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 w-full items-center justify-between">
          <button
            onClick={(e) => {
              props.confirmRide();
              props.setConfirmRidePopUpPanel(true);
            }}
            className=" mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
          >
            Accept
          </button>
          <button
            onClick={(e) => {
              props.setRidePopUpPanel(false);
            }}
            className=" mt-5 w-full bg-gray-700 text-white font-semibold p-2 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
}
