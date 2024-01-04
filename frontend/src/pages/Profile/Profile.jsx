import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { RenderInputField } from "../../components/Input";
import Popover from "../../components/Popover";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    state: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadUser = async () => {
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }
      const authorization = localStorage.getItem("token");
      if (!authorization) navigate("/login");
      const response = await api.get("/users", {
        headers: { authorization },
      });
      setUserData(response.data);
    } catch (error) {
      toast.error("Login Required");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("users");
      localStorage.removeItem("searchQuery");
      localStorage.removeItem("sortKey");
      localStorage.removeItem("sortDirection");
      navigate("/login");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    loadUser();
    if (data) {
      setUserData(JSON.parse(data));
    } else {
      navigate("/login");
    }
  }, []);

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleDeleteProfile = async () => {
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }
      const authorization = localStorage.getItem("token");
      if (!authorization) navigate("/login");
      await api.delete("/users", {
        headers: { authorization },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Profile deleted successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          User Profile
        </h1>
        <RenderInputField label="Name" value={userData.name} readOnly />
        <RenderInputField label="Email" value={userData.email} readOnly />
        <RenderInputField label="Phone" value={userData.phone} readOnly />
        <RenderInputField label="Gender" value={userData.gender} readOnly />
        <RenderInputField label="City" value={userData.city} readOnly />
        <RenderInputField label="State" value={userData.state} readOnly />
        <div className="flex gap-4">
          <button
            onClick={handleEditProfile}
            className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-600"
          >
            Edit Profile
          </button>
          <button
            onClick={handleShowDeleteModal}
            className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
          >
            Delete Profile
          </button>
        </div>

        {/* Delete Profile Modal */}
        {showDeleteModal && (
          <Popover
            title="Confirm Deletion"
            content="Are you sure you want to delete your profile? This action cannot be undone."
            onConfirm={handleDeleteProfile}
            onCancel={handleDeleteCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
