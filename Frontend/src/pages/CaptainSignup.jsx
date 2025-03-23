import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import axios from "axios";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();
  // This function is called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set the user data to the email and password
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehicleNumber,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    // This is where you will call the backend to login the user
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status == 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setCaptain(data);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log("Error in the captain sign up page : ", error);
    } finally {
      // After the user is logged in, you can redirect the user to the home page
      // Set the email and password to empty string
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleCapacity("");
      setVehicleColor("");
      setVehicleNumber(null);
      setVehicleType("");
    }
  };
  return (
    <div className="py-5 px-5 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Img"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg w-full font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="first name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="example@mail.com"
          />
          <h3 className="text-lg font-medium mb-2">Vehicle information</h3>
          <div className="flex gap-4 mb-6">
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Vehicle color"
            />
            <input
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Vehicle number"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              required
              type="number"
              placeholder="Vehicle capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              required
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Create account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs mt-6 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
