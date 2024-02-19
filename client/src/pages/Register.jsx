import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const validateEmail = () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleRegister = async () => {
    try {
      if (!emailError) {
        const res = await axios.post(URL + "/api/auth/register", {
          username,
          email,
          password,
        });
        setError(false);
        toast.success("User registration successful!");
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        navigate("/login");
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-100">
        <h1 className="text-lg md:text-xl font-bold ">
          <Link to="/">BLOG APP</Link>
        </h1>
        <h3 className="font-semibold text-md">
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="w-full flex items-center justify-center h-[80vh] px-4">
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-[60%] lg:w-[40%] px-4 md:px-10">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-sm"
            type="text"
            placeholder="Enter username"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={validateEmail}
            autoCapitalize="none"
            className={`w-full px-4 py-2 border-2 outline-0 rounded-sm border-black`}
            type="email"
            placeholder="Enter your email id"
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-sm"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg
         hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>
          {emailError && (
            <h3 className="text-red-500 text-md">
              Please enter a valid email address
            </h3>
          )}
          {error && (
            <h3 className="text-md text-red-500">Something went wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p className="">Already have an account?</p>
            <p className="text-gray-500 hover:text-black text-md">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
