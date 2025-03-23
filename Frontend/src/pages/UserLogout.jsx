import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const nevigat = useNavigate();

  const callBackendService = async () => {
    try {
      // Calling the backend to logout user.
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        localStorage.removeItem("token");
        nevigat("/user-login");
      }
    } catch (error) {
      console.log("Error in the logout page : ", error);
      alert("Error when try to logout.");
    }
  };
  callBackendService();

  return (
    <>
      <h4>User Logout</h4>
    </>
  );
};

export default UserLogout;
