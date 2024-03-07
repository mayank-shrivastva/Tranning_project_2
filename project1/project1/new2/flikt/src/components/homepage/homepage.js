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

  useEffect(() => {
    let loginStatus = localStorage.getItem('LoginStatus');
    if (loginStatus) {
      setIsLoggedIn(true);
      fetchNewData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
    try {
      await axios.post("http://localhost:9002/newdata", newData);
      setNewData({ name: "", email: "" });  
      fetchNewData(); // Fetch updated data after addition
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
      fetchNewData(); // Fetch updated data after deletion
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
      fetchNewData(); // Fetch updated data after submission
      setUpdateData({ _id: null, name: "", email: "" }); // Reset updateData state
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (!isLoggedIn) {
    return navigate("/login");
  }

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
        <input
          type="email"
          placeholder="Email"
          value={newData.email}
          onChange={(e) => setNewData({ ...newData, email: e.target.value })}
        />
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
                    <button onClick={() => handleUpdateData(user)}>Update</button>
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
