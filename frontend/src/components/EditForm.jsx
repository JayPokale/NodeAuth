import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RenderInputField, RenderSelectField } from "./Input";
import api from "../../services/api";
import { toast } from "react-toastify";

const EditForm = ({ apiUrl, redirectPath }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    state: "",
  });

  const loadUser = async () => {
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }
      const authorization = localStorage.getItem("token");
      if (!authorization) navigate("/login");
      const response = await api.get(`${apiUrl}/${id || ""}`, {
        headers: { authorization },
      });
      setFormData(response.data);
    } catch (error) {
      toast.error("An error occured");
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }
      const authorization = localStorage.getItem("token");
      if (!authorization) navigate("/login");
      await api.put(`${apiUrl}/${id || ""}`, formData, {
        headers: { authorization },
      });
      toast.success("User updated successfully");
      if (redirectPath === "/")
        localStorage.setItem("user", JSON.stringify(formData));

      navigate(redirectPath);
    } catch (error) {
      toast.error("User update failed");
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Edit Profile
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <RenderInputField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <RenderInputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <RenderInputField
            label="Phone"
            name="phone"
            type="text"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <RenderSelectField
            label="Gender"
            name="gender"
            options={["Male", "Female", "Others"]}
            value={String(formData.gender)}
            onChange={handleChange}
          />
          <RenderInputField
            label="City"
            name="city"
            type="text"
            placeholder="Mumbai"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <RenderInputField
            label="State"
            name="state"
            type="text"
            placeholder="Maharashtra"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
