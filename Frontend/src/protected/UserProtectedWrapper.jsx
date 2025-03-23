import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);
  useEffect(() => {
    if (!token) {
      navigate("/user-login"); // Redirect to login page if no token
    }
    verifyUser();
  }, [token, navigate]);

  const verifyUser = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      navigate("/user-login");
    }
  };

  if (isLoading) {
    return <>Verifing User.........</>;
  }
  return <>{children}</>; // Render children if token is available
};

export default UserProtectedWrapper;
