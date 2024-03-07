import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:9002/register", user)
        .then((res) => {
          console.log("This is user", res);
           
          navigate("/login")
          
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            window.alert(error.response.data.message); // Alert the user with the error message
          } else {
            window.alert("Registration failed. Please try again later.");
          }
        });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
      <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
      <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
      <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>

      <div className="button" onClick={register}>Register</div>
      <div>or</div>
      <div className="button"><a href="http://localhost:3000/login">Login</a></div>
    </div>
  );
};

export default Register;
