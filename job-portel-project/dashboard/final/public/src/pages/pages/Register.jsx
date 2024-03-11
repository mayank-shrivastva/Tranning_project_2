import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right"
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { name, email, phone, password } = data.errors;
          if (name) generateError(name);
          else if (email) generateError(email);
          else if (phone) generateError(phone);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div className="container">
      <h2>{showLoginForm ? "Register as a user " : "Register as a job poster"}</h2>
      {showLoginForm ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit">Submit</button>
           
          <span>
            Already have an account ?<Link to="/login"> Login</Link>
          </span>
        </form>
      ) : (
        // Your login form component here
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit">Submit</button>
          
          <span>
            Already have an account ?<Link to="/login"> Login</Link>
          </span>
        </form>
        </div>
      )}
    <br></br>
    <center>  <button onClick={() => setShowLoginForm(!showLoginForm)}>
        {showLoginForm ? "Register as job poster " : "Register as User"}
      </button></center>
      <ToastContainer />
    </div>
  );
}

export default Register;
