import React, { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  useEffect(() => {
    const loginStatus = localStorage.getItem("LoginStatus");
    if (loginStatus) {
      navigate("/homepage");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;

    // Validation checks
    if (!name.trim() || !email.trim() || !password.trim() || !reEnterPassword.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password !== reEnterPassword) {
      alert("Passwords do not match");
      return;
    }

    // If all validations pass, proceed with registration
    axios.post("http://localhost:9002/register", user)
      .then((res) => {
        console.log("This is user", res);
        localStorage.setItem("LoginStatus", email); // Set login status upon successful registration
        navigate("/homepage");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          window.alert(error.response.data.message); // Alert the user with the error message
        } else {
          window.alert("Registration failed. Please try again later.");
        }
      });
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
