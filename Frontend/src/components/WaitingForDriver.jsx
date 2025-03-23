import React from "react";

function WaitingForDriver({ setWaitingForDriver, confirmRideData }) {
  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={(e) => {
          setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl  text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium ">
            {confirmRideData?.captain?.fullname?.firstname || ""}
            {"    "}
            {confirmRideData?.captain?.fullname?.lastname || ""}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {confirmRideData?.captain?.vehicle?.vehicleType||''}
          </h4>
          <p className="text-sm  text-gray-600">
            {confirmRideData?.captain?.vehicle?.plate||''}
          </p>
          <h1 className="text-lg font-medium ">
            {confirmRideData?.otp|| ""}
          </h1>
        </div>
      </div>
      <div className="flex justify-between items-center flex-col gap-3">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {confirmRideData?.pickup||''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-checkbox-blank-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Third Wave Coffee</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {confirmRideData?.destination||''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{confirmRideData?.fare||''}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingForDriver;
