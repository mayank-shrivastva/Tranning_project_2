import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";  
import "../css/sidebar.css";
import "../css/nav.css";
import "./jobpost";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
      {/* Include the NavBar component */}
      <NavBar />
      <div className="sideBar">
      <Sidebar/>
      </div>
     
      
      <div className="jobpost">
        <jobpost/>
      </div>
      
      <div className="private">

        
        <h3>Job Portal</h3>
        ghjg
        <button  onClick={logOut}>Log out</button>
      </div>
       
      
      <ToastContainer />
    </>
  );
}
