import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const { onEvent, offEvent } = useSocket();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRideEnded = (data) => {
      console.log("Ride finished:", data);
      navigate("/home");
    };

    onEvent("ride-ended", handleRideEnded);

    return () => {
      offEvent("ride-ended", handleRideEnded);
    };
  }, [onEvent, offEvent, navigate]);

  return (
    <div className="h-screen relative">
      <Link
        to="/user/logout"
        className="fixed right-2 top-15 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg z-20"
      >
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>

      <div className="h-full flex flex-col">
        {/* Live Tracking */}
        <div className="">
          <LiveTracking role="user" ride={state?.ride} />
        </div>

        {/* Ride Details */}
        <div className="h-1/2 p-4 bg-white shadow-lg rounded-t-lg">
          {/* Captain Info */}
          <div className="flex items-center justify-between">
            <img
              className="h-12"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
              alt="Vehicle"
            />
            <div className="text-right">
              <h2 className="text-lg font-medium">
                {state?.ride?.captain?.fullname?.firstname}{" "}
                {state?.ride?.captain?.fullname?.lastname}
              </h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">
                {state?.ride?.captain?.vehicle?.plate}
              </h4>
              <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            </div>
          </div>

          {/* Ride Info */}
          <div className="flex justify-between items-center flex-col gap-3 mt-5">
            <div className="w-full">
              <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-checkbox-blank-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">Third Wave Coffee</h3>
                  <p className="text-sm -mt-1 text-gray-600">
                    {state?.ride?.destination}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">₹{state?.ride?.fare}</h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button className="mt-5 w-full bg-green-600 text-white font-semibold p-3 rounded-lg shadow-md">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
