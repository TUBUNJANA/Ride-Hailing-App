import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";

const UserSignup = () => {
  // All state variables are declared here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const nevigat = useNavigate();
  // This function is called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set the user data to the email and password
    const userData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };
    try {
      // This is where you will call the backend to login the user
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userData
      );
      console.log(response);
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data);
        // Notification.success({
        //   message: "User created successfully",
        // });
        nevigat("/home");
      }
    } catch (error) {
      console.log("Error : ", error);
      alert("User already exists");
      return;
    }
    // After the user is logged in, you can redirect the user to the home page
    // Set the email and password to empty string
    setFirstName("");
    setLastName("");
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
            <Link to="/user-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
