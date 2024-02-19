import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black w-44 md:w-56 z-10 absolute flex flex-col items-start absolute top-16 right-6 md:right-28 rounded-md p-4 space-y-2 cursor-pointer">
      {!user && (
        <Link
          to="/login"
          className="text-white text-md hover:text-gray-300 w-full"
        >
          Login
        </Link>
      )}
      {!user && (
        <Link
          to="/register"
          className="text-white text-md hover:text-gray-300 w-full"
        >
          Register
        </Link>
      )}
      {user && (
        <Link
          to={"/profile/" + user._id}
          className="text-white text-md hover:text-gray-300 w-full"
        >
          Profile
        </Link>
      )}
      {user && (
        <Link
          to={"/write"}
          className="text-white text-md hover:text-gray-300 w-full"
        >
          Write
        </Link>
      )}
      {user && (
        <Link
          to={"/myblogs/" + user._id}
          className="text-white text-md hover:text-gray-300 w-full"
        >
          My blogs
        </Link>
      )}
      {user && (
        <p
          onClick={handleLogout}
          className="text-white text-md hover:text-gray-300 w-full cursor-pointer"
        >
          Logout
        </p>
      )}
    </div>
  );
};

export default Menu;
