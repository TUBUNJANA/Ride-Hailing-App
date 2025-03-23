import React from "react";

function VehiclePanel({
  setVehiclePanel,
  setPanelOpen,
  setConfirmRidePanel,
  setVehicleType,
  fare,
}) {
  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={(e) => {
          setVehiclePanel(false);
          setPanelOpen(false);
        }}
      >
        <i className="text-3xl  text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h2 className="text-2xl font-semibold mb-5">Choose a Vehicle </h2>
      <div
        onClick={() => {
          setVehicleType('car');
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
        className="gap-4 border-2 p-3 rounded-xl  flex items-center my-3 border-gray-200 active:border-black justify-start"
      >
        <img
          className="h-20"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-lg">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">
          ${fare?.car ? fare?.car : 208.43}
        </h2>
      </div>
      <div
        onClick={() => {
          setVehicleType('motorcycle');
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
        className="gap-4 border-2 p-3 rounded-xl  flex items-center my-3 border-gray-200 active:border-black justify-start"
      >
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-lg">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">
          ${fare?.motorcycle ? fare?.motorcycle : 65.0}
        </h2>
      </div>
      <div
        onClick={() => {
          setVehicleType('motorcycle');
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
        className="gap-4 border-2 p-3 rounded-xl  flex items-center my-3 border-gray-200 active:border-black justify-start"
      >
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-lg">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, auto ride
          </p>
        </div>
        <h2 className="text-xl font-semibold">
          ${fare?.auto ? fare?.auto : 113.23}
        </h2>
      </div>
    </div>
  );
}

export default VehiclePanel;
