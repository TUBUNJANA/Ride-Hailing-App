import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  // This is the UserLogin page
  //   It is a form that takes in email and password
  const [email, setEmail] = useState("");
  //   Pasword state to store the password
  const [password, setPassword] = useState("");
  // User data context to store the data in the user variable.
  const { user, setUser } = useContext(UserDataContext);
  // Nevigate
  const nevigat = useNavigate();
  //   This is the submit function that will be called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set the user data to the email and password
    const userData = { email, password };
    console.log(userData);
    // This is where you will call the backend to login the user
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      //
      if (response.status == 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data);

        // After the user is logged in, you can redirect the user to the home page
        nevigat("/home");
      }
    } catch (error) {
      console.log("Error while logging in.", error);
      alert("Error in the login process.");
      return;
    }

    // Set the email and password to empty string
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
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
            New here?{" "}
            <Link to="/user-signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};
export default UserLogin;
