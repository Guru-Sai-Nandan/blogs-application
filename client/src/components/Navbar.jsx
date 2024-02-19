import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    setMenu(!menu);
  };

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [prompt, setPrompt] = useState("");
  const path = useLocation().pathname;

  const handleSearch = () => {
    if (prompt) navigate("?search=" + prompt);
    else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-bold ">
        <Link to="/">BLOGIFY</Link>
      </h1>
      {path === "/" && (
        // <div className="flex justify-center items-center space-x-0">
        //   <p
        //     onClick={() => {
        //       if (prompt) navigate("?search=" + prompt);
        //       else navigate("/");
        //     }}
        //     className="cursor-pointer"
        //   >
        //     <BsSearch />
        //   </p>
        //   <input
        //     onChange={(e) => {
        //       setPrompt(e.target.value);
        //     }}
        //     className="px-3 py-1 outline-none"
        //     placeholder="Search a blog..."
        //     type="text"
        //   />
        // </div>

        <div className="hidden md:block">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              type="search"
              onKeyDown={handleKeyPress}
              className="block w-[44vw] max-w-[28vw] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Blogs..."
            />
            <button
              onClick={handleSearch}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3 className="font-semibold text-md">
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3 className="font-semibold text-md">
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative p-1 hover:bg-gray-200 rounded">
              <FaBars className="text-xl" />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3 className="font-semibold text-md">
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;