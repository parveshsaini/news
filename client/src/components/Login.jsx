// Login.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import toast from "react-hot-toast";

const Login = () => {
  const { login, user } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(credentials);
        navigate("/");
        window.location.reload();
    } catch (error) {
        toast.error("Invalid credentials");
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" max-w-lg mx-auto p-8 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Login to your account</h1>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2  "
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2  border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 "
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-slate-900 text-white rounded-md text-lg font-semibold  transition duration-300"
        >
          Login
        </button>

        <p>Already have an account? <a className="cursor-pointer underline underline-offset-2 font-semibold text-blue-800" onClick={()=> navigate('/signup')}>Signup</a> </p>

      </form>
    </div>
  );
};

export default Login;