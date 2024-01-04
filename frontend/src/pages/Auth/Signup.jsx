import React, { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { RenderInputField, RenderSelectField } from "../../components/Input";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    howDidYouHear: "",
    city: "",
    state: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }

      const response = await api.post("/auth/signup", formData);

      localStorage.setItem("token", response.data.key);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Logged in successfully");
      navigate("/");

      setFormData(initialFormData);
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Signup
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <RenderInputField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <RenderInputField
            label="Email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <RenderInputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <RenderInputField
            label="Phone"
            name="phone"
            type="text"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
          />
          <RenderSelectField
            label="Gender"
            name="gender"
            options={["Male", "Female", "Others"]}
            value={formData.gender}
            onChange={handleChange}
          />
          <RenderSelectField
            label="How did you hear about this?"
            name="howDidYouHear"
            options={["LinkedIn", "Friends", "Job Portal", "Others"]}
            value={formData.howDidYouHear}
            onChange={handleChange}
          />
          <RenderInputField
            label="City"
            name="city"
            type="text"
            placeholder="Mumbai"
            value={formData.city}
            onChange={handleChange}
          />
          <RenderSelectField
            label="State"
            name="state"
            options={[
              "Andhra Pradesh",
              "Arunachal Pradesh",
              "Assam",
              "Bihar",
              "Chhattisgarh",
              "Goa",
              "Gujarat",
              "Haryana",
              "Himachal Pradesh",
              "Jharkhand",
              "Karnataka",
              "Kerala",
              "Madhya Pradesh",
              "Maharashtra",
              "Manipur",
              "Meghalaya",
              "Mizoram",
              "Nagaland",
              "Odisha",
              "Punjab",
              "Rajasthan",
              "Sikkim",
              "Tamil Nadu",
              "Telangana",
              "Tripura",
              "Uttar Pradesh",
              "Uttarakhand",
              "West Bengal",
            ]}
            value={formData.state}
            onChange={handleChange}
          />
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
