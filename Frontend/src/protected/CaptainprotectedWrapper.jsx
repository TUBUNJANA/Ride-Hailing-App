import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login"); // Redirect to login page if no token
    }
    verifyCaptain();
  }, [token, navigate]);

  const verifyCaptain = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_BASE_URL}/captains/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setCaptain(response.data.captain);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      navigate("/captain-login");
    }
  };

  if (isLoading) {
    return <>Verifing Captain.........</>;
  }

  return <>{children}</>; // Render children if token is available
};

export default CaptainProtectedWrapper;
