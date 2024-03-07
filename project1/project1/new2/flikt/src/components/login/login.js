import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
 



const Login = () => {

    
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleLogin = () => {
        const { email, password } = user;

        // Validate email and password
        if (email && password) {
            // Send login request to backend
            axios.post("http://localhost:9002/login", { email, password })
                .then(response => {
                    setMessage(response.data.message);
                    localStorage.setItem("LoginStatus", email);
                    navigate("/homepage")
                    
                    
                })
                .catch(error => {
                    if (error.response) {
                        setMessage(error.response.data.message);
                    } else {
                        setMessage("Login failed. Please try again later.");
                    }
                });
        } else {
            setMessage("Invalid email or password");
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" />
            <div className="button" onClick={handleLogin}>Login</div>
            <div>or</div>
            <div className="button"><a href="http://localhost:3000/">Register</a></div>
            {message && <p>{message}</p>}

        </div>
    );
};

export default Login;
