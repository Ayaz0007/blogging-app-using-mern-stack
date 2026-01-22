import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  BadgeCheck,
  Mail,
  User,
  CalendarDays,
  Camera,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://blogging-app-using-mern-stack.onrender.com/auth/profile/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
        });
      } catch (err) {
        toast.error("Error fetching user profile.");
      }
    };

    fetchUser();
  }, [email, token]);

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `https://blogging-app-using-mern-stack.onrender.com/auth/profile/${email}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(res.data);
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error("Error updating profile.");
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      await axios.post(
        `https://blogging-app-using-mern-stack.onrender.com/auth/change-password`,
        { ...passwordData, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Password update failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`${darkMode ? "bg-gray-950 text-gray-600" : "bg-gray-50 text-gray-900"} min-h-screen flex items-center justify-center px-4 py-20 transition-colors`}>
      <ToastContainer />
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 relative transition">
        {/* Header & Dark mode toggle */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">👤 Profile</h2>
          <button
            onClick={toggleDarkMode}
            className="text-xs px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`pb-2 font-semibold transition-colors ${selectedTab === "profile" ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 dark:text-gray-400"}`}
            onClick={() => setSelectedTab("profile")}
          >
            Profile Info
          </button>
          <button
            className={`pb-2 font-semibold transition-colors ${selectedTab === "password" ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 dark:text-gray-400"}`}
            onClick={() => setSelectedTab("password")}
          >
            Change Password
          </button>
        </div>

        {/* Profile Info Tab */}
        {selectedTab === "profile" && (
          <div className="space-y-7">
            <div className="flex items-center space-x-5">
              <div className="relative w-20 h-20">
                <img
                  src={profileImage ? URL.createObjectURL(profileImage) : "/default-avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-900 shadow"
                />
                <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-indigo-700 transition">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-xl font-bold">{formData.username}</p>
                <span className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                  {userData.role || "User"} · Joined{" "}
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Unknown"}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <User className="w-4 h-4" />
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                disabled={!editing}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled={!editing}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              {!editing ? (
                <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Edit
                </button>
              ) : (
                <>
                  <button onClick={() => setEditing(false)} className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    Cancel
                  </button>
                  <button onClick={handleUpdate} className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Change Password Tab */}
        {selectedTab === "password" && (
          <div className="space-y-7">
            {["currentPassword", "newPassword", "confirmPassword"].map((field, idx) => (
              <div key={idx}>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <KeyRound className="w-4 h-4" />
                  {field === "currentPassword"
                    ? "Current Password"
                    : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password"}
                </label>
                <input
                  type="password"
                  value={passwordData[field]}
                  onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            ))}
            <button
              onClick={handlePasswordChange}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mt-2"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
