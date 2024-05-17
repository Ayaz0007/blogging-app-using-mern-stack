import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("loggedInUser")).token;
        const email = localStorage.getItem("userEmail"); // Get user's email from localStorage
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }
        const response = await axios.get(`http://localhost:5000/auth/profile/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    };
    

    fetchUserData();
  }, []);


  // CHANGE PASSWORD LOGIC 

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = JSON.parse(localStorage.getItem("loggedInUser")).token;
  //     console.log("Token:", token);
  //     const response = await axios.put(
  //       "http://localhost:5000/auth/password",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Correct format
  //         },
  //       }
  //     );
  //     console.log("Password change response:", response.data);
  //     setFormData({
  //       currentPassword: "",
  //       newPassword: "",
  //       confirmPassword: "",
  //     });
  //     setSuccess("Password changed successfully");
  //     setError("");
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Change password error:", error.response.data);
  //       setError(error.response.data.message);
  //     } else {
  //       console.error("Change password error:", error.message);
  //       setError("An error occurred while changing password.");
  //     }
  //     setSuccess("");
  //   }
  // };
  
  
  

  return (
    <div className="max-w-md mx-auto mt-40 p-6 bg-gray-300 rounded-lg ring-2 ring-purple-300 ring-offset-2 ring-offset-purple-100">
      <h2 className="text-2xl font-semibold mb-6 text-center rounded bg-slate-100 py-2 px-2 shadow-md">Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 rounded px-2 py-2 bg-gray-50 shadow-md">
        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="username">
          Username :
        </label>
        <p>{userData.username}</p>
      </div>
      <div className="mb-4 rounded px-2 py-2 bg-gray-50 shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email :
        </label>
        <p>{userData.email}</p>
      </div>

      {/* CHANGE PASSWORD FEILD */}

      {/* <h2 className="text-2xl font-semibold mb-6 text-center">Change Password</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="rounded-md px-4 py-4 bg-gray-50 shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline hover:border-black"
            id="currentPassword"
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-black"
            id="newPassword"
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-black"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default Profile;
