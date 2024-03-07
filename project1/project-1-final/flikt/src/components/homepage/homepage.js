import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [newData, setNewData] = useState({ name: "", email: "" });
  const [updateData, setUpdateData] = useState({ _id: null, name: "", email: "" });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "" });

  useEffect(() => {
    const loginStatus = localStorage.getItem('LoginStatus');
    if (!loginStatus) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
      fetchNewData();
    }
  }, [navigate]);

  const fetchNewData = async () => {
    try {
      const response = await axios.get("http://localhost:9002/newdata");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('LoginStatus');
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleAddData = async () => {
    if (!newData.name.trim() || !newData.email.trim()) {
      setErrors({ name: "Name is required", email: "Email is required" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newData.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
      return;
    }

    try {
      await axios.post("http://localhost:9002/newdata", newData);
      setNewData({ name: "", email: "" });
      fetchNewData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdateData = (user) => {
    setUpdateData(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9002/newdata/${id}`);
      fetchNewData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleFormChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9002/newdata/${updateData._id}`, updateData);
      fetchNewData();
      setUpdateData({ _id: null, name: "", email: "" });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="homepage">
      <button className="button" onClick={handleLogout}>Logout</button>
      <h1>Hello Admin</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newData.name}
          onChange={(e) => setNewData({ ...newData, name: e.target.value })}
        />
        {errors.name && <div className="error">{errors.name}</div>}
        <input
          type="email"
          placeholder="Email"
          value={newData.email}
          onChange={(e) => setNewData({ ...newData, email: e.target.value })}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <button onClick={handleAddData}>Add Data</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {updateData._id === user._id ? (
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      name="name"
                      value={updateData.name}
                      onChange={handleFormChange}
                    />
                    <input
                      type="email"
                      name="email"
                      value={updateData.email}
                      onChange={handleFormChange}
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    <button onClick={() => handleUpdateData(user)}>Update</button> &nbsp;&nbsp;
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
