import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  // This is the UserLogin page
  //   It is a form that takes in email and password
  const [email, setEmail] = useState("");
  //   Pasword state to store the password
  const [password, setPassword] = useState("");
  //   Captain data state to store the user data
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  //   This is the submit function that will be called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set the user data to the email and password
    const captainData = { email: email, password: password };
    console.log(captainData);
    // This is where you will call the backend to login the user
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );
      if (response.status == 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setCaptain(data);
        // After the user is logged in, you can redirect the user to the home page
        navigate("/captain-home");
      }
    } catch (error) {
      console.log("Error in the captain login page : ", error);
    }

    // Set the email and password to empty string
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-2"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Img"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="example@mail.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center">
            Join a fleet?{" "}
            <Link to="/captain-signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/user-login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
