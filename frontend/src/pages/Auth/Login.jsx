import React, { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { RenderInputField } from "../../components/Input";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.key);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Logged in successfully");
      navigate("/");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
