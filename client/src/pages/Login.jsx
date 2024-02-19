import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("User login successful!");
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-100">
        <h1 className="text-lg md:text-xl font-bold ">
          <Link to="/">BLOG APP</Link>
        </h1>
        <h3 className="font-semibold text-md">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="flex flex-col items-center justify-center h-[80vh] px-4">
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-[60%] lg:w-[40%] px-4 md:px-10">
          <h1 className="text-xl font-bold text-left">Login to your account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-sm"
            type="text"
            placeholder="Enter your email id"
          />
          <input
            onKeyDown={handleKeyPress}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-sm"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg
       hover:bg-gray-500 hover:text-black"
          >
            Login
          </button>

          {error && (
            <h3 className="text-md text-red-500">Something went wrong</h3>
          )}

          <div className="flex justify-center items-center space-x-3">
            <p className="">New here?</p>
            <p className="text-gray-500 hover:text-black cursor-pointer">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
