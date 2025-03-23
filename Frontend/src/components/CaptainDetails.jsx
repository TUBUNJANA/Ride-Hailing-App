import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

export default function CaptainDetails() {
  const { captain } = useContext(CaptainDataContext);
  console.log("Captain  details : ", captain);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3 ">
          <img
            className="h-10 w-10  rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XsQ4BAn4O19F6hU1y4J16nLoICbVLOnAog&s"
            alt=""
          />
          <h4 className="text-lg font-medium">
            {captain?.fullname?.firstname||''+" "+captain?.fullname?.lastname||''}

          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">$244.34</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-4 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-time-line"></i>
          <h5 className="text-lg font-medium ">10.2</h5>
          <p className="text-sm text-gray-600 ">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium ">10.2</h5>
          <p className="text-sm text-gray-600 ">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-money-rupee-circle-fill"></i>
          <h5 className="text-lg font-medium ">1234.232</h5>
          <p className="text-sm text-gray-600 ">Hours Online</p>
        </div>
      </div>
    </div>
  );
}
